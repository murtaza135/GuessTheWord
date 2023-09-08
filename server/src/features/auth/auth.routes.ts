import Router from 'express-promise-router';
import rateLimit from '../../middleware/rateLimit';
import * as authController from './auth.controller';
import * as authSchemas from './auth.schema';
import validate from '../../middleware/validate';
import config from '../../config/config';
import { authenticate, protect, startOAuth, logout } from './auth.middleware';

const router = Router();

// router.get(
//   '/auth/fail',
//   function (req, res) {
//     console.log('auth failed');
//     res.status(401).json({ message: 'auth failed' });
//   }
// );

// router.post(
//   '/auth/login/local',
//   validate.body(authSchemas.login),
//   passport.authenticate('local-login', { failureRedirect: `${config.API_URL}/auth/fail`, session: false }),
//   (_req, res) => res.status(204).end(),
// );

router.post(
  '/auth/register/local',
  rateLimit({ maxAttempts: 5, duration: 60 }),
  validate.body(authSchemas.register),
  authenticate({ strategy: 'local-register' }),
  (_req, res) => res.status(204).end()
);

router.post(
  '/auth/authorize/local',
  protect({ message: 'You must login to access this route' }),
  validate.body(authSchemas.register),
  // passport.authorize('local-authorize', { failureRedirect: `${config.CLIENT_URL}/profile` }),
  authenticate({ strategy: 'local-authorize', session: false }),
  (_req, res) => res.status(204).end()
);

router.post(
  '/auth/login/local',
  rateLimit({ maxAttempts: 5, duration: 60 }),
  validate.body(authSchemas.login),
  authenticate({ strategy: 'local-login' }),
  (_req, res) => res.status(204).end()
);

router.get(
  '/auth/login/github',
  startOAuth({ strategy: 'github', scope: ['user:email', 'read:user'] })
);

router.get(
  '/auth/callback/github',
  authenticate({ strategy: 'github' }),
  (_req, res) => res.redirect(config.CLIENT_URL)
);

router.get(
  '/auth/authorize/github',
  protect({ message: 'You must login to access this route' }),
  startOAuth({ strategy: 'github-authorize', scope: ['user:email', 'read:user'] })
);

router.get(
  '/auth/authorize-callback/github',
  function (req, res, next) { console.log('DONKEYYY hello world'); next(); },
  protect({ message: 'You must login to access this route' }),
  // TODO is redirect needed for oauth in the case of failure
  authenticate({ strategy: 'github-authorize', session: false }),
  // passport.authorize('github-authorize', { successRedirect: `${config.CLIENT_URL}/profile`, failureRedirect: `${config.CLIENT_URL}/profile` }),
  // (_req, res) => res.redirect(config.CLIENT_URL)
  (_req, res) => res.redirect(config.CLIENT_URL)
);

router.get(
  '/auth/login/google',
  startOAuth({ strategy: 'google', scope: ['profile', 'email'] })
);

router.get(
  '/auth/callback/google',
  authenticate({ strategy: 'google' }),
  (_req, res) => res.redirect(config.CLIENT_URL)
);

router.get(
  '/auth/profile',
  protect({ message: 'You must login to access this route' }),
  authController.sendUser
);

router.get(
  '/auth/accounts',
  protect({ message: 'You must login to access this route' }),
  authController.sendAccounts,
);

router.post(
  '/auth/logout',
  logout,
  (_req, res) => res.status(204).end()
);

export default router;
