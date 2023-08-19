import { User } from '@prisma/client';
import pick from 'lodash/pick';
import xprisma from '../../config/db';
import { WinLoss } from './win-loss.types';

async function incrementWins(userId: User['id'], wins?: User['wins']) {
  const numWins = wins ?? 1;
  const user = await xprisma.user.update({
    data: { wins: { increment: numWins } },
    where: { id: userId }
  });
  const winLoss: WinLoss = pick(user, ['wins', 'losses']);
  return winLoss;
}

async function incrementLosses(userId: User['id'], losses?: User['losses']) {
  const numLosses = losses ?? 1;
  const user = await xprisma.user.update({
    data: { losses: { increment: numLosses } },
    where: { id: userId }
  });
  const winLoss: WinLoss = pick(user, ['wins', 'losses']);
  return winLoss;
}

const winLossServices = {
  incrementWins,
  incrementLosses
};

export default winLossServices;
