import { User as PrismaUser } from '@prisma/client';

export type User = {
  id: PrismaUser['id'];
  [x: string]: unknown;
};

export type UserObject = Pick<PrismaUser, 'email' | 'id' | 'name'>;
