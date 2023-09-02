// @resource TkDodo - https://github.com/TkDodo/testing-react-query/tree/main
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { rest } from 'msw';
import { ProfileResponse } from '@/features/auth';

const handlers = [
  rest.post(
    '*/auth/login/local',
    (_req, res, ctx) => {
      return res(
        ctx.status(204),
        ctx.cookie("access", "1"),
      );
    }
  ),
  rest.post(
    '*/auth/register/local',
    (_req, res, ctx) => {
      return res(
        ctx.status(204),
        ctx.cookie("access", "1"),
      );
    }
  ),
  rest.post(
    '*/auth/authorize/local',
    (_req, res, ctx) => {
      return res(
        ctx.status(204),
      );
    }
  ),
  rest.get(
    '*/auth/profile',
    (_req, res, ctx) => {
      const user: ProfileResponse = {
        userId: 1,
        name: 'test',
        email: 'test@test.com',
      };

      return res(
        ctx.status(200),
        ctx.json(user)
      );
    }
  ),
  rest.get(
    '*/auth/accounts',
    (_req, res, ctx) => {
      const accounts = { localAccount: null, oAuthAccounts: [] };
      return res(
        ctx.status(200),
        ctx.json(accounts)
      );
    }
  ),
  rest.post(
    '*/auth/logout',
    (_req, res, ctx) => {
      return res(
        ctx.status(204),
        ctx.cookie("access", ""),
      );
    }
  ),
];

export const server = setupServer(...handlers);

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
