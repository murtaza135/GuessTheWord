import { Request, Response, NextFunction } from 'express';
import * as authServices from './auth.services';
import config from '../../config/config';

export function sendAuthCookie(options?: { redirect?: string; }) {
  return function (req: Request, res: Response) {
    if (!req.user) throw new Error('req.user does not exist in sendAuthCookie in auth.controller.ts');
    const accessToken = authServices.generateAccessToken(req.user.userId);
    res.cookie(config.ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: config.ACCESS_TOKEN_COOKIE_MAX_AGE
    });

    // console.log(req.session);
    console.log('HERE');

    // @ts-ignore
    req.session.accessToken = accessToken;
    // req.session.data = req.user.userId;
    // req.session.save();
    // console.log(req.session);
    // req.session.data = 1;

    if (options?.redirect) {
      res.redirect(options.redirect);
    } else {
      res.status(204).end();
    }
  };
}

export function clearAuthCookie(req: Request, res: Response) {
  res.clearCookie(config.ACCESS_TOKEN_COOKIE_NAME, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.status(204).end();
}

export function sendUser(req: Request, res: Response) {
  if (!req.user) throw new Error('req.user does not exist in sendUser in auth.controller.ts');
  res.status(200).json(req.user);
}

export async function sendAccounts(req: Request, res: Response) {
  if (!req.user) throw new Error('req.user does not exist in sendAccounts in auth.controller.ts');
  const accounts = await authServices.getAccounts(req.user.userId);
  res.status(200).json(accounts);
}
