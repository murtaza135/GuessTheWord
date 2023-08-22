import { Request, Response } from 'express';
import authServices from './auth.services';
import { LoginSchema } from './auth.schema';
import config from '../../config/config';

// TODO rename to sendAccessTokenCookie
function sendAccessToken(req: Request<unknown, unknown, LoginSchema>, res: Response) {
  if (!req.user) throw new Error('req.user does not exist in sendAccessToken in auth.controller.ts');
  const accessToken = authServices.generateAccessToken(req.user.userId);
  res.cookie(config.ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: config.ACCESS_TOKEN_COOKIE_MAX_AGE
  });
  res.status(204).json({ success: true });
}

function redirectAccessToken(req: Request<unknown, unknown, LoginSchema>, res: Response) {
  if (!req.user) throw new Error('req.user does not exist in sendAccessToken in auth.controller.ts');
  const accessToken = authServices.generateAccessToken(1);
  res.cookie(config.ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: config.ACCESS_TOKEN_COOKIE_MAX_AGE
  });
  res.redirect(config.CLIENT_URL);
}

async function sendUser(req: Request, res: Response) {
  if (!req.user) throw new Error('req.user does not exist in sendUser in auth.controller.ts');
  const user = await authServices.getUser(req.user.userId);
  res.status(200).json(user);
}

const authController = {
  sendAccessToken,
  redirectAccessToken,
  sendUser
};

export default authController;
