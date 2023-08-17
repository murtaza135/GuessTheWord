import Router from 'express-promise-router';
import rateLimit from '../../middleware/rateLimit';

const router = Router();

router.post(
  '/auth/register',
  rateLimit({ maxAttempts: 5, duration: 60 }),
  // validate.body(createUserSchema),
  // registerController
);

router.post(
  '/auth/login',
  rateLimit({ maxAttempts: 5, duration: 60 }),
  // validate.body(loginSchema),
  // loginController
);

router.post(
  '/auth/logout',
  // logoutController
);
