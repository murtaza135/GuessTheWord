import path from 'path';
import express from 'express';
import Router from 'express-promise-router';
import actuator from 'express-actuator';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieSession from 'cookie-session';
import config from './config/config';
import { morgan } from './config/logger';
import APIError from './errors/APIError';
import errorHandler from './errors/error-handler';
import rateLimit from './middleware/rateLimit';
import { authRouter, initAuthStrategies } from './features/auth';
import { winLossRouter } from './features/win-loss';

const app = express();
const router = Router();
app.use(`/api/v${config.VERSION_MAJOR}`, router);

initAuthStrategies();

router.use(express.static(path.join(__dirname, 'public')));

router.use(morgan());
router.use(express.json());
router.use(cookieParser());
router.use(compression());
router.use(helmet());
router.use(cors({ origin: config.CLIENT_URL, credentials: true }));
router.use(hpp());
router.use(rateLimit({ maxAttempts: 25, duration: 1 }));

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  httpOnly: true,
  secure: !config.IS_DEVELOPMENT,
  sameSite: 'strict',
  maxAge: config.ACCESS_TOKEN_COOKIE_MAX_AGE
}));

// router.use(function (req, res, next) {
//   // console.log(JSON.stringify(req.cookies));
//   // console.log(req.session?.isChanged);
//   // console.log(req.session?.isPopulated);
//   // console.log(req.session?.isNew);
//   // console.log(req.session?.accessToken);
//   next();
// });

router.use(actuator({
  basePath: '/_app',
  infoBuildOptions: {
    name: 'Guess the Word!',
    version: config.VERSION
  }
}));

router.use(authRouter);
router.use(winLossRouter);

router.use((req) => {
  throw new APIError({
    statusText: 'Not Found',
    message: 'API route not found',
  });
});

router.use(errorHandler);

export default app;
