import path from 'path';
import ms from 'ms';
import { z } from 'zod';
import { validateEnv } from './dotenv';

const env = validateEnv(z.object({
  CLIENT_URL: z.string(),
  DOMAIN_NAME_PROTOCOL: z.string(),
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['production', 'development', 'test']),
  VERSION: z.string().regex(/^[0-9]+\.[0-9]+\.[0-9]+$/), // e.g. 11.2.456
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'debug']),
  DATABASE_URL: z.string(),
  COOKIE_SECRET: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  GITHUB_CLIENT_ID_LOGIN: z.string(),
  GITHUB_CLIENT_SECRET_LOGIN: z.string(),
  GITHUB_CLIENT_ID_LINK: z.string(),
  GITHUB_CLIENT_SECRET_LINK: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
}));

const config = {
  VERSION_MAJOR: env.VERSION.split('.')[0],
  DEV: (env.NODE_ENV || 'production') === 'development',
  PROD: (env.NODE_ENV || 'production') === 'production',
  MODE: env.NODE_ENV,
  ENTRY_POINT: process.argv[1],
  ENTRY_PATH: path.dirname(process.argv[1]),
  API_URL: `${env.DOMAIN_NAME_PROTOCOL}:${env.PORT}/api/v${env.VERSION.split('.')[0]}`,
  ACCESS_TOKEN_MAX_AGE: '15m',
  SESSION_COOKIE_MAX_AGE: ms('15m'),
  SESSION_COOKIE_NAME: 'session',
  NON_HTTP_SESSION_COOKIE_NAME: 'session-non-http',
  ...env,
} as const;

export default config;
