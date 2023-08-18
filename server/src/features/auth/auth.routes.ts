import Router from 'express-promise-router';
import rateLimit from '../../middleware/rateLimit';
import auth from '../../lib/auth';
import authController from './auth.controller';
import authSchemas from './auth.schema';
import validate from '../../middleware/validate';

const router = Router();

router.post(
  '/auth/register',
  rateLimit({ maxAttempts: 5, duration: 60 }),
  validate.body(authSchemas.register),
  auth.authenticate({ strategy: 'local-register' }),
  authController.sendAccessToken,
);

router.post(
  '/auth/login',
  rateLimit({ maxAttempts: 5, duration: 60 }),
  validate.body(authSchemas.login),
  auth.authenticate({ strategy: 'local-login' }),
  authController.sendAccessToken,
);

router.get(
  '/auth/test',
  auth.authenticate({ strategy: 'protect', message: 'You must login to access this route' }),
  function (req, res, next) {
    res.status(200).json({ success: true });
  }
);

export default router;
