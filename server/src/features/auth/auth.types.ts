import { User } from '@prisma/client';

export type ExpressRequestUser = {
  userId: User['userId'];
  [x: string]: unknown;
};
