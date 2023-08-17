import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory, IRateLimiterOptions, RateLimiterRes } from 'rate-limiter-flexible';
import APIError from '../errors/APIError';

type RateLimitOptions = IRateLimiterOptions & {
  maxAttempts?: number;
};

function rateLimit(options: RateLimitOptions) {
  const rateLimiter = new RateLimiterMemory({
    ...options,
    points: options.maxAttempts || options.points
  });

  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await rateLimiter.consume(req.ip);
      next();
    } catch (error: unknown) {
      const msBeforeNextAttempt = error instanceof RateLimiterRes ? error.msBeforeNext : null;
      throw new APIError({
        statusText: 'Too Many Requests',
        message: 'There have been too many requests. Please try again later.',
        fields: { msBeforeNextAttempt }
      });
    }
  };
}

export default rateLimit;
