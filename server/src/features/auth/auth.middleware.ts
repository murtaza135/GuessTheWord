import { Express, Request, Response, NextFunction } from 'express';
import passport, { AuthenticateOptions } from 'passport';
import APIError from '../../errors/APIError';
import * as authServices from './auth.services';
import type { Strategy } from './auth.strategies';

export type AuthOptions = {
  strategy: Strategy;
  message?: string;
  session?: boolean;
  unauthenticatedRedirect?: string;
};

export type StartOAuthOptions = {
  strategy: Strategy;
  scope: NonNullable<AuthenticateOptions['scope']>;
};

export function authenticate({
  strategy,
  message,
  session = true,
  unauthenticatedRedirect,
}: AuthOptions) {
  return function (req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      strategy,
      function (error: unknown, user: Express.User) {
        if (error) {
          // TODO change redirect on error
          if (unauthenticatedRedirect) return res.redirect(`${unauthenticatedRedirect}?error=Error`);
          if (error instanceof Error) return next(error);
          return next(new Error('Something went wrong', { cause: error }));
        }

        if (!user) {
          // TODO change redirect on error
          if (unauthenticatedRedirect) return res.redirect(`${unauthenticatedRedirect}?error=${message ?? 'Unauthorized'}`);
          return next(new APIError({
            statusText: 'Unauthorized',
            message: message ?? 'Unauthorized',
          }));
        }

        if (session) {
          req.user = user;
          if (!req.session) req.session = {};
          req.session.accessToken = authServices.generateAccessToken(user.userId);
        }

        return next();
      }
    )(req, res, next);
  };
}

export function protect({ message }: Pick<AuthOptions, 'message'>) {
  return authenticate({ strategy: 'protect', session: true, message });
}

export function startOAuth({ strategy, scope }: StartOAuthOptions) {
  return passport.authenticate(strategy, { scope });
}

export function logout(req: Request, res: Response, next: NextFunction) {
  req.session = null;
  next();
}
