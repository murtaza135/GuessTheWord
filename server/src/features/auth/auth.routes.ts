import Router from 'express-promise-router';
import rateLimit from '../../middleware/rateLimit';
import auth from '../../lib/auth';
import authController from './auth.controller';
import authSchemas from './auth.schema';
import validate from '../../middleware/validate';
import config from '../../config/config';

const router = Router();

router.post(
  '/auth/register',
  rateLimit({ maxAttempts: 5, duration: 60 }),
  validate.body(authSchemas.register),
  auth.authenticate({ strategy: 'local-register' }),
  authController.sendAuthCookie(),
);

router.post(
  '/auth/login',
  rateLimit({ maxAttempts: 5, duration: 60 }),
  validate.body(authSchemas.login),
  auth.authenticate({ strategy: 'local-login' }),
  authController.sendAuthCookie(),
);

router.get(
  '/auth/login/github',
  auth.authenticate({ strategy: 'github', scope: ['user:email', 'read:user'] })
);

router.get(
  '/auth/callback/github',
  auth.authenticate({ strategy: 'github' }),
  authController.sendAuthCookie({ redirect: config.CLIENT_URL })
);

router.get(
  '/auth/login/google',
  auth.authenticate({ strategy: 'google', scope: ['profile', 'email'] })
);

router.get(
  '/auth/callback/google',
  auth.authenticate({ strategy: 'google' }),
  authController.sendAuthCookie({ redirect: config.CLIENT_URL })
);

router.get(
  '/auth/me',
  auth.authenticate({ strategy: 'protect', message: 'You must login to access this route' }),
  authController.sendUser
);

// TODO add logout

export default router;
