import { randomUUID } from 'crypto';
import { Express, Request, Response, NextFunction } from 'express';
import passport, { AuthenticateOptions } from 'passport';
import APIError from '../../errors/APIError';
import * as authServices from './auth.services';
import type { Strategy } from './auth.strategies';
import config from '../../config/config';

export type AuthOptions = {
  strategy: Strategy;
  message?: string;
  session?: boolean;
  renewSession?: boolean;
  failRedirect?: string;
};

export type StartOAuthOptions = {
  strategy: Strategy;
  scope: NonNullable<AuthenticateOptions['scope']>;
};

type CreateSessionOptions = {
  user: Express.User;
};

function createSession(req: Request, res: Response, { user }: CreateSessionOptions) {
  if (!req.session) req.session = {};

  // @source https://medium.com/@thbrown/logging-out-with-http-only-session-ad09898876ba
  const nonHttpAccessToken = randomUUID();
  res.cookie(config.NON_HTTP_SESSION_COOKIE_NAME, nonHttpAccessToken, {
    httpOnly: false,
    sameSite: config.PROD ? 'strict' : 'none',
    maxAge: config.SESSION_COOKIE_MAX_AGE,
    secure: config.PROD
  });

  req.session.nonHttpAccessToken = nonHttpAccessToken;
  req.session.httpOnlyAccessToken = authServices.generateAccessToken(user.userId);
}

function removeSession(req: Request, res: Response) {
  req.session = null;
  res.clearCookie(config.NON_HTTP_SESSION_COOKIE_NAME, {
    httpOnly: false,
    sameSite: config.PROD ? 'strict' : 'none',
    maxAge: config.SESSION_COOKIE_MAX_AGE,
    secure: config.PROD
  });
}

export function authenticate({
  strategy,
  message,
  session = true,
  renewSession = true,
  failRedirect,
}: AuthOptions) {
  return function (req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      strategy,
      function (error: unknown, user: Express.User) {
        if (error) {
          if (session) removeSession(req, res);
          if (failRedirect) return res.redirect(`${failRedirect}?error=${encodeURIComponent('Something went wrong')}`);
          if (error instanceof Error) return next(error);
          return next(new Error('Something went wrong', { cause: error }));
        }

        if (!user) {
          if (session) removeSession(req, res);
          if (failRedirect) return res.redirect(`${failRedirect}?error=${encodeURIComponent(message ?? 'Unauthorized')}`);
          return next(new APIError({ statusText: 'Unauthorized', message: message ?? 'Unauthorized' }));
        }

        if (session) {
          req.user = user;
          if (renewSession) createSession(req, res, { user });
        }

        return next();
      }
    )(req, res, next);
  };
}

export function authorize(options: Omit<AuthOptions, 'session' | 'renewSession'>) {
  return authenticate({ ...options, session: false, renewSession: false });
}

export function protect(options: Omit<AuthOptions, 'strategy' | 'session' | 'renewSession'>) {
  return authenticate({ ...options, strategy: 'protect', session: true, renewSession: false });
}

export function startOAuth({ strategy, scope }: StartOAuthOptions) {
  return passport.authenticate(strategy, { scope });
}

export function logout(req: Request, res: Response, next: NextFunction) {
  removeSession(req, res);
  next();
}
