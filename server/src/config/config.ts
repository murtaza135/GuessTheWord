import path from 'path';
import ms from 'ms';
import { env } from './dotenv';

const config = {
  VERSION_MAJOR: env.VERSION.split('.')[0],
  IS_DEVELOPMENT: (env.NODE_ENV || 'production') === 'development',
  ENTRY_POINT: process.argv[1],
  ENTRY_PATH: path.dirname(process.argv[1]),
  API_URL: `${env.DOMAIN_NAME_PROTOCOL}:${env.PORT}/api/v${env.VERSION.split('.')[0]}`,
  ACCESS_TOKEN_MAX_AGE: '15m',
  SESSION_COOKIE_MAX_AGE: ms('15m'),
  SESSION_COOKIE_NAME: 'session',
  ...env,
} as const;

export default config;
