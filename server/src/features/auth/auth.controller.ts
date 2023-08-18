import { Request, Response } from 'express';
import authServices from './auth.services';
import { LoginSchema } from './auth.schema';

function sendAccessToken(req: Request<unknown, unknown, LoginSchema>, res: Response) {
  const user = req.user!;
  const accessToken = authServices.generateAccessToken(user.id);
  res.status(200).json({ token: accessToken });
}

const authController = {
  sendAccessToken
};

export default authController;
