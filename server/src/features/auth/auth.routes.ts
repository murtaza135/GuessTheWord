import Router from 'express-promise-router';
import rateLimit from '../../middleware/rateLimit';
import auth from '../../lib/auth';
import authController from './auth.controller';

const router = Router();

// router.post(
//   '/auth/register',
//   rateLimit({ maxAttempts: 5, duration: 60 }),
//   // validate.body(createUserSchema),
//   // registerController
// );

router.post(
  '/auth/login',
  // rateLimit({ maxAttempts: 5, duration: 60 }),
  // validate.body(loginSchema),
  auth.authenticate({ strategy: 'local-login', message: 'lol' }),
  authController.sendAccessToken
);

// router.post(
//   '/auth/logout',
//   // logoutController
// );

export default router;
