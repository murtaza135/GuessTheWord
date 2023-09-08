import { Express, Request, Response, NextFunction } from 'express';
import passport, { Strategy, AuthenticateOptions } from 'passport';
import isEmpty from 'lodash/isEmpty';

export type StrategyConfig = {
  name?: string;
  strategy: Strategy;
};

type InitOptions<T extends Record<string, any> = Record<string, any>> = {
  config: StrategyConfig | StrategyConfig[];
  serializeFn: (user: Express.User) => T;
  deserializeFn: (session: T) => Express.User;
  unauthorizedFn?: (options: { message: string; }) => Error;
};

type AuthOptions = {
  strategy: string | string[] | Strategy;
  message?: string;
  session?: boolean;
};

type StartOAuthOptions = {
  scope: AuthenticateOptions['scope'];
};

class Auth {
  private serializeFn?: (user: Express.User) => Record<string, any>;
  private deserializeFn?: (session: Record<string, any>) => Express.User;
  private unauthorizedFn?: (options: { message: string; }) => Error;

  // eslint-disable-next-line max-len
  init<T extends Record<string, any> = Record<string, any>>({ config, serializeFn, deserializeFn, unauthorizedFn }: InitOptions<T>) {
    this.serializeFn = serializeFn;
    this.deserializeFn = deserializeFn;
    this.unauthorizedFn = unauthorizedFn;

    const configs = config instanceof Array ? config : [config];
    configs.forEach(({ name, strategy }) => {
      if (name) {
        passport.use(name, strategy);
      } else {
        passport.use(strategy);
      }
    });
  }

  authenticate(options: AuthOptions) {
    const self = this;
    return function (req: Request, res: Response, next: NextFunction) {
      passport.authenticate(
        options.strategy,
        function (error: unknown, user: Express.User) {
          if (error) {
            if (error instanceof Error) return next(error);
            return next(new Error('Something went wrong', { cause: error }));
          }

          if (!user) {
            const message = options.message ?? 'Unauthorized';
            if (self.unauthorizedFn) return next(self.unauthorizedFn({ message }));
            return next(new Error(options.message ?? 'Unauthorized'));
          }

          req.user = user;

          if (req.session) {
            const newSession = { ...req.session, ...self.serializeFn?.(req.user) };
            if (!isEmpty(newSession)) req.session = newSession;
          }

          return next();
        }
      )(req, res, next);
    };
  }
}

const auth = new Auth();
export default auth;
