import { Request, Response } from 'express';
import authServices from './auth.services';
import { LoginSchema } from './auth.schema';

function sendAccessToken(req: Request<unknown, unknown, LoginSchema>, res: Response) {
  const reqUser = req.user!;
  const accessToken = authServices.generateAccessToken(reqUser.userId);
  res.status(200).json({ token: accessToken });
}

async function sendUser(req: Request, res: Response) {
  const reqUser = req.user!;
  const user = await authServices.getUser(reqUser.userId);
  res.status(200).json(user);
}

const authController = {
  sendAccessToken,
  sendUser
};

export default authController;
