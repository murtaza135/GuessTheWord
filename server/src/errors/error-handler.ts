import { Request, Response, NextFunction } from 'express';
import APIError from './APIError';
import { shutdownGracefully } from '../config/graceful-shutdown';
import { logger } from '../config/logger';
import { isErrorOperational } from './utils';

const errorHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (isErrorOperational(error)) {
    res.status(error.status).json(error);
    logger.info(error);
  } else {
    const internalServerError = new APIError({ statusText: 'Internal Server Error', cause: error });
    res.status(internalServerError.status).json(internalServerError);
    logger.error(error);
    shutdownGracefully();
  }
};

export default errorHandler;
