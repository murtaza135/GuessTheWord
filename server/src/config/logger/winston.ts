import path from 'path';
import winston from 'winston';
import { simpleMessage, detailedMessage, enumerateError, colorizeError } from './winston.utils';
import config from '../config';

export const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB (in bytes)

const level = config.PROD ? 'warn' : 'debug';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
} as const;

export type LogLevel = keyof typeof levels;

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'blue',
  debug: 'gray',
});

const defaultFormat = winston.format.combine(
  enumerateError(),
);

const consoleTransport = new winston.transports.Console({
  level: config.LOG_LEVEL || 'debug',
  format: winston.format.combine(
    colorizeError(),
    winston.format.colorize({ level: true, message: true }),
    winston.format.timestamp({ format: 'HH:mm:ss:ms' }),
    winston.format.printf(detailedMessage),
  ),
  handleExceptions: true,
  handleRejections: true,
});

const simpleErrorFileTransport = new winston.transports.File({
  level: 'warn',
  filename: path.join(config.ENTRY_PATH, '..', 'logs', 'simple-errors.log'),
  maxsize: FILE_SIZE_LIMIT,
  maxFiles: 5,
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss:ms' }),
    winston.format.printf(simpleMessage),
  ),
  handleExceptions: false,
  handleRejections: false,
});

const detailedErrorFileTransport = new winston.transports.File({
  level: 'warn',
  filename: path.join(config.ENTRY_PATH, '..', 'logs', 'detailed-errors.log'),
  maxsize: FILE_SIZE_LIMIT,
  maxFiles: 5,
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss:ms' }),
    winston.format.printf(detailedMessage),
  ),
  handleExceptions: true,
  handleRejections: true,
});

const logger = winston.createLogger({
  level,
  levels,
  format: defaultFormat,
  transports: [simpleErrorFileTransport, detailedErrorFileTransport],
  exitOnError: false
});

if (!config.PROD) logger.add(consoleTransport);

type Logger = Pick<winston.Logger, LogLevel>;

export default logger as Logger;
