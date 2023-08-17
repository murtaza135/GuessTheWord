import path from 'path';
import express from 'express';
import Router from 'express-promise-router';
import actuator from 'express-actuator';
import config from './config/config';
import { morgan } from './config/logger';
import APIError from './errors/APIError';
import errorHandler from './errors/error-handler';
import rateLimit from './middleware/rateLimit';

const app = express();
const router = Router();
app.use(`/api/v${config.VERSION_MAJOR}`, router);

router.use(express.static(path.join(__dirname, 'public')));

router.use(morgan());
router.use(express.json());
router.use(rateLimit({ maxAttempts: 25, duration: 1 }));

router.use(actuator({
  basePath: '/_app',
  infoBuildOptions: {
    name: 'Guess the Word!',
    version: config.VERSION
  }
}));

router.use(() => { throw new APIError({ statusText: 'Not Found' }); });
router.use(errorHandler);

export default app;
