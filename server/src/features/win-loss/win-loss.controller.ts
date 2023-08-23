import { Request, Response } from 'express';
import * as winLossServices from './win-loss.services';
import { IncrementWinsSchema, IncrementLossesSchema } from './win-loss.schema';

export async function incrementWins(
  req: Request<unknown, unknown, IncrementWinsSchema>,
  res: Response,
) {
  if (!req.user) throw new Error('req.user does not exist in incrementWins in win-loss.controller.ts');
  const winLoss = await winLossServices.incrementWins(req.user.userId, req.body.wins);
  res.status(200).json(winLoss);
}

export async function incrementLosses(
  req: Request<unknown, unknown, IncrementLossesSchema>,
  res: Response,
) {
  if (!req.user) throw new Error('req.user does not exist in incrementLosses in win-loss.controller.ts');
  const winLoss = await winLossServices.incrementLosses(req.user.userId, req.body.losses);
  res.status(200).json(winLoss);
}
