import { User } from '@prisma/client';

export type UserData = {
  userId: User['userId'];
  [x: string]: unknown;
};
