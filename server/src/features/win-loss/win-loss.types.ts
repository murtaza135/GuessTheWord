import { User } from '@prisma/client';

export type WinLoss = Pick<User, 'wins' | 'losses'>;
