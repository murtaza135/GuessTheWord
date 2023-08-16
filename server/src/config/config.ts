import path from 'path';
import { env } from './dotenv';

const config = {
  VERSION_MAJOR: env.VERSION.split('.')[0],
  IS_DEVELOPMENT: (env.NODE_ENV || 'production') === 'development',
  ENTRY_POINT: process.argv[1],
  ENTRY_PATH: path.dirname(process.argv[1]),
  ...env,
};

export default config;
