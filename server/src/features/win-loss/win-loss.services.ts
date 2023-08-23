import { User } from '@prisma/client';
import xprisma from '../../config/db';

export async function incrementWins(userId: User['userId'], wins?: User['wins']) {
  const userWinLoss = await xprisma.user.update({
    data: { wins: { increment: wins ?? 1 } },
    where: { userId },
    select: { wins: true, losses: true }
  });
  return userWinLoss;
}

export async function incrementLosses(userId: User['userId'], losses?: User['losses']) {
  const userWinLoss = await xprisma.user.update({
    data: { losses: { increment: losses ?? 1 } },
    where: { userId },
    select: { wins: true, losses: true },
  });
  return userWinLoss;
}
