import Router from 'express-promise-router';
import rateLimit from '../../middleware/rateLimit';
import * as authController from './auth.controller';
import * as authSchemas from './auth.schema';
import validate from '../../middleware/validate';
import config from '../../config/config';
import { authenticate, protect, startOAuth, logout } from './auth.middleware';

const router = Router();

router.post(
  '/auth/local/register',
  rateLimit({ maxAttempts: 5, duration: 60 }),
  validate.body(authSchemas.create),
  authenticate({ strategy: 'local-register' }),
  (_req, res) => res.status(204).end()
);

router.post(
  '/auth/local/login',
  rateLimit({ maxAttempts: 5, duration: 60 }),
  validate.body(authSchemas.login),
  authenticate({ strategy: 'local-login', message: 'Invalid Credentials' }),
  (_req, res) => res.status(204).end()
);

router.post(
  '/auth/local/link',
  protect({ message: 'You must login to access this route' }),
  validate.body(authSchemas.create),
  authenticate({ strategy: 'local-link', session: false }),
  (_req, res) => res.status(204).end()
);

router.get(
  '/auth/github/login',
  startOAuth({ strategy: 'github-login', scope: ['user:email', 'read:user'] })
);

router.get(
  '/auth/github/login/callback',
  authenticate({ strategy: 'github-login', unauthenticatedRedirect: config.CLIENT_URL }),
  (_req, res) => res.redirect(config.CLIENT_URL)
);

router.get(
  '/auth/github/link',
  protect({ message: 'You must login to access this route' }),
  startOAuth({ strategy: 'github-link', scope: ['user:email', 'read:user'] })
);

router.get(
  '/auth/github/link/callback',
  protect({ message: 'You must login to access this route' }),
  authenticate({ strategy: 'github-link', session: false, unauthenticatedRedirect: config.CLIENT_URL }),
  (_req, res) => res.redirect(config.CLIENT_URL)
);

router.get(
  '/auth/google/login',
  startOAuth({ strategy: 'google-login', scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/login/callback',
  authenticate({ strategy: 'google-login', unauthenticatedRedirect: config.CLIENT_URL }),
  (_req, res) => res.redirect(config.CLIENT_URL)
);

router.get(
  '/auth/google/link',
  protect({ message: 'You must login to access this route' }),
  startOAuth({ strategy: 'google-link', scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/link/callback',
  protect({ message: 'You must login to access this route' }),
  // (req, res, next) => { req.user = { userId: 3 }; next(); },
  authenticate({ strategy: 'google-link', session: false, unauthenticatedRedirect: config.CLIENT_URL }),
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
