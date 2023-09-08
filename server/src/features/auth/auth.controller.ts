import { Request, Response } from 'express';
import * as authServices from './auth.services';

export async function sendUser(req: Request, res: Response) {
  if (!req.user) throw new Error('req.user does not exist in sendUser in auth.controller.ts');
  const user = await authServices.getUser(req.user.userId);
  res.status(200).json(user);
}

export async function sendAccounts(req: Request, res: Response) {
  if (!req.user) throw new Error('req.user does not exist in sendAccounts in auth.controller.ts');
  const localAccount = await authServices.getLocalAccount(req.user.userId);
  const oAuthAccounts = await authServices.getOAuthAccounts(req.user.userId);
  res.status(200).json({ localAccount, oAuthAccounts });
}
