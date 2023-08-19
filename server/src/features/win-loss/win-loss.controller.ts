import { Request, Response } from 'express';
import winLossServices from './win-loss.services';
import { IncrementWinsSchema, IncrementLossesSchema } from './win-loss.schema';

async function incrementWins(
  req: Request<unknown, unknown, IncrementWinsSchema>,
  res: Response,
) {
  const user = req.user!;
  const winLoss = await winLossServices.incrementWins(user.id, req.body.wins);
  res.status(200).json(winLoss);
}

async function incrementLosses(
  req: Request<unknown, unknown, IncrementLossesSchema>,
  res: Response,
) {
  const user = req.user!;
  const winLoss = await winLossServices.incrementLosses(user.id, req.body.losses);
  res.status(200).json(winLoss);
}

const winLossController = {
  incrementWins,
  incrementLosses
};

export default winLossController;
