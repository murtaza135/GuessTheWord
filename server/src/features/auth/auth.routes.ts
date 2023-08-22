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
  '/auth/login/github',
  auth.authenticate({ strategy: 'github', scope: ['user:email', 'read:user'] })
);

router.get(
  '/auth/callback/github',
  auth.authenticate({ strategy: 'github' }),
  authController.redirectAccessToken
);

router.get(
  '/auth/login/google',
  auth.authenticate({ strategy: 'google', scope: ['profile', 'email'] })
);

router.get(
  '/auth/callback/google',
  auth.authenticate({ strategy: 'google' }),
  authController.redirectAccessToken
);

router.get(
  '/auth/me',
  auth.authenticate({ strategy: 'protect', message: 'You must login to access this route' }),
  authController.sendUser
);

export default router;
