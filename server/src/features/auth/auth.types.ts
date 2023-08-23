import { User } from '@prisma/client';

export type UserData = {
  userId: User['userId'];
  name: User['name'];
  email: User['email'];
  image: User['image'];
  [x: string]: unknown;
};
