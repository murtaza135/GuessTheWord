import Router from 'express-promise-router';
import passport from 'passport';
import rateLimit from '../../middleware/rateLimit';
import auth from '../../lib/auth';
import * as authController from './auth.controller';
import * as authSchemas from './auth.schema';
import validate from '../../middleware/validate';
import config from '../../config/config';

const router = Router();

router.post(
  '/auth/register/local',
  rateLimit({ maxAttempts: 5, duration: 60 }),
  validate.body(authSchemas.register),
  auth.authenticate({ strategy: 'local-register' }),
  authController.sendAuthCookie(),
);

router.post(
  '/auth/login/local',
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
  '/auth/authorize/github',
  auth.authenticate({ strategy: 'protect', message: 'You must login to access this route' }),
  auth.authenticate({ strategy: 'github-authorize', scope: ['user:email', 'read:user'] })
);

router.get(
  '/auth/authorize-callback/github',
  function (req, res, next) { console.log('DONKEYYY hello world'); next(); },
  auth.authenticate({ strategy: 'protect', message: 'You must login to access this route' }),
  // auth.authenticate({ strategy: 'github-authorize' }),
  passport.authorize('github-authorize', { successRedirect: `${config.CLIENT_URL}/profile`, failureRedirect: `${config.CLIENT_URL}/profile` }),
  // authController.sendAuthCookie({ redirect: config.CLIENT_URL })
  (req, res) => res.redirect(config.CLIENT_URL)
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
  '/auth/profile',
  auth.authenticate({ strategy: 'protect', message: 'You must login to access this route' }),
  authController.sendUser
);

router.get(
  '/auth/accounts',
  auth.authenticate({ strategy: 'protect', message: 'You must login to access this route' }),
  authController.sendAccounts,
);

router.post(
  '/auth/logout',
  authController.clearAuthCookie
);

export default router;
