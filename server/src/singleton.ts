/* eslint-env jest */
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import xprisma from './config/db';

jest.mock('./config/db', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = xprisma as unknown as DeepMockProxy<PrismaClient>;
