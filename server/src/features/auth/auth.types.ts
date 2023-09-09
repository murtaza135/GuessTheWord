import { User } from '@prisma/client';

export type ExpressUser = {
  userId: User['userId'];
  [x: string]: unknown;
};
