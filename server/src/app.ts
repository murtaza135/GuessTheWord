import path from 'path';
import express from 'express';
import Router from 'express-promise-router';
import actuator from 'express-actuator';
import cookieParser from 'cookie-parser';
import config from './config/config';
import { morgan } from './config/logger';
import APIError from './errors/APIError';
import errorHandler from './errors/error-handler';
import rateLimit from './middleware/rateLimit';
import { authRouter, strategyConfig } from './features/auth';
import { winLossRouter } from './features/win-loss';
import auth from './lib/auth';

const app = express();
const router = Router();
app.use(`/api/v${config.VERSION_MAJOR}`, router);

auth.init(strategyConfig, {
  onUnauthorized: ({ message }) => new APIError({ statusText: 'Unauthorized', message })
});

router.use(express.static(path.join(__dirname, 'public')));

router.use(morgan());
router.use(express.json());
router.use(cookieParser());
router.use(rateLimit({ maxAttempts: 25, duration: 1 }));

router.use(actuator({
  basePath: '/_app',
  infoBuildOptions: {
    name: 'Guess the Word!',
    version: config.VERSION
  }
}));

router.use(authRouter);
router.use(winLossRouter);

router.use(() => { throw new APIError({ statusText: 'Not Found', message: 'API route not found' }); });
router.use(errorHandler);

export default app;
