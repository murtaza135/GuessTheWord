import { Request, Response } from 'express';
import authServices from './auth.services';
import config from '../../config/config';

function sendAuthCookie(options?: { redirect?: string; }) {
  return function (req: Request, res: Response) {
    if (!req.user) throw new Error('req.user does not exist in sendAuthCookie in auth.controller.ts');
    const accessToken = authServices.generateAccessToken(req.user.userId);
    res.cookie(config.ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: config.ACCESS_TOKEN_COOKIE_MAX_AGE
    });

    if (options?.redirect) {
      res.redirect(options.redirect);
    } else {
      res.status(204).end();
    }
  };
}

function clearAuthCookie(req: Request, res: Response) {
  res.clearCookie(config.ACCESS_TOKEN_COOKIE_NAME, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.status(204).end();
}

async function sendUser(req: Request, res: Response) {
  if (!req.user) throw new Error('req.user does not exist in sendUser in auth.controller.ts');
  res.status(200).json(req.user);
}

const authController = {
  sendAuthCookie,
  clearAuthCookie,
  sendUser
};

export default authController;
