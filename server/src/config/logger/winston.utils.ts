import winston from 'winston';
import colors from '@colors/colors/safe';
import { Color } from '@colors/colors';

export const enumerateError = winston.format((info) => {
  // reassign name, message and (error) stack properties to info object
  // in order to make them enumerable so that they can be picked up
  // by winston printf functions for uncaught exceptions and unhandled rejections

  if (info.message instanceof Error) {
    // eslint-disable-next-line no-param-reassign
    info.message = {
      ...info.message,
      message: `${info.message.name} | ${info.message.message}`,
      error: info.message.stack
    };
  }

  if (info instanceof Error) {
    // eslint-disable-next-line no-param-reassign
    info = {
      ...info,
      message: `(${info.name}) ${info.message}`,
      error: info.stack
    };
  }

  return info;
});

type ColorizeErrorOpts = { color?: keyof Color; };

export const colorizeError = winston.format((info, opts: ColorizeErrorOpts) => {
  if (info.error) {
    const color = opts?.color || 'grey';
    const colorFunc = colors[color];
    // eslint-disable-next-line no-param-reassign
    info.error = colorFunc(info.error);
  }

  return info;
});

export const simpleMessage = (info: winston.Logform.TransformableInfo) => (
  `${info.timestamp} | ${info.level}: ${info.message}`
);

export const detailedMessage = (info: winston.Logform.TransformableInfo): string => (
  (info.error)
    ? `${info.timestamp} | ${info.level}: ${info.message}\n${info.error}`
    : `${info.timestamp} | ${info.level}: ${info.message}`
);
