import { Request, Response } from 'express';
import * as authServices from './auth.services';

export function sendUser(req: Request, res: Response) {
  if (!req.user) throw new Error('req.user does not exist in sendUser in auth.controller.ts');
  res.status(200).json(req.user);
}

export async function sendAccounts(req: Request, res: Response) {
  if (!req.user) throw new Error('req.user does not exist in sendAccounts in auth.controller.ts');
  const accounts = await authServices.getAccounts(req.user.userId);
  res.status(200).json(accounts);
}
