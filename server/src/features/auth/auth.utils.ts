import { Express, Request, Response, NextFunction } from 'express';
import passport, { Strategy } from 'passport';
import APIError from '../../errors/APIError';

export function sendAuthFailResponse(req: Request, res: Response) {
  const error = new APIError({ statusText: 'Unauthorized' });
  res.status(error.status).json(error);
}

export function sendAuthSuccessResponse(req: Request, res: Response) {

}

export function authenticate(
  strategy: string | string[] | Strategy,
  options?: { message: string | undefined; },
) {
  return function (req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      strategy,
      function (
        error: unknown,
        user: Express.User,
        info?: Record<string, unknown> & { message?: string; },
        status?: unknown,
      ) {
        if (error) return next(error);
        if (!user) return next(new APIError({ statusText: 'Unauthorized', message: options?.message ?? info?.message }));
        req.user = user;
        return next();
      }
    )(req, res, next);
  };
}
