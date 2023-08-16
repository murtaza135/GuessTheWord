/* eslint-disable prefer-destructuring */
import path from 'path';

export const VERSION = process.env.VERSION;
export const VERSION_MAJOR = VERSION?.split('.')[0];
export const PORT = process.env.PORT || '5000';
export const IS_DEVELOPMENT = (process.env.NODE_ENV || 'production') === 'development';
export const ENTRY_POINT = process.argv[1];
export const ENTRY_PATH = path.dirname(ENTRY_POINT);
export const LOG_LEVEL = 'http';
