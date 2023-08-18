import { Request, Response } from 'express';
import authServices from './auth.services';

function sendAccessToken(req: Request, res: Response) {
  // @ts-ignore
  const userId = req.user?.id;
  const accessToken = authServices.generateAccessToken(userId);
  res.status(200).json({ token: accessToken });
}

const authController = {
  sendAccessToken
};

export default authController;
