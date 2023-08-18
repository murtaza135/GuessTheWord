import Router from 'express-promise-router';
import passport from 'passport';
import rateLimit from '../../middleware/rateLimit';
import APIError from '../../errors/APIError';
import config from '../../config/config';
import { authenticate } from './auth.utils';

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
  authenticate('local-login', { message: 'lol' }),
  function (req, res, next) {
    res.status(200).json({
      success: true
    });
  }
);

// router.post(
//   '/auth/logout',
//   // logoutController
// );

export default router;
