import { Request, Response } from 'express';
import authServices from './auth.services';
import { LoginSchema } from './auth.schema';

function sendAccessToken(req: Request<unknown, unknown, LoginSchema>, res: Response) {
  if (!req.user) throw new Error('req.user does not exist in sendAccessToken in auth.controller.ts');
  const accessToken = authServices.generateAccessToken(req.user.userId);
  res.status(200).json({ token: accessToken });
}

async function sendUser(req: Request, res: Response) {
  if (!req.user) throw new Error('req.user does not exist in sendUser in auth.controller.ts');
  const user = await authServices.getUser(req.user.userId);
  res.status(200).json(user);
}

const authController = {
  sendAccessToken,
  sendUser
};

export default authController;
