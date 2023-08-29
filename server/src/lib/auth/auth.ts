import { Express, Request, Response, NextFunction } from 'express';
import passport, { Strategy, AuthenticateOptions } from 'passport';
import { type XOR } from 'ts-essentials';

type AuthenticateMiddlewareOptions = { strategy: string | string[] | Strategy; }
  & XOR<
    { scope?: AuthenticateOptions['scope']; user?: boolean; },
    { message?: string; }
  >;

type StrategyInfo = {
  message?: string;
  [x: string]: unknown;
};

type OnUnauthorizedOptions = Omit<AuthenticateMiddlewareOptions, 'scope'> & StrategyInfo;
type OnUnauthorizedFn = (options: OnUnauthorizedOptions) => Error;

export type StrategyConfig = {
  name?: string;
  strategy: Strategy;
};

type InitOptions = {
  config: StrategyConfig | StrategyConfig[];
  onUnauthorized?: OnUnauthorizedFn;
};

class Auth {
  private onUnauthorized?: OnUnauthorizedFn;

  init({ config, onUnauthorized }: InitOptions) {
    this.onUnauthorized = onUnauthorized;

    const configs = config instanceof Array ? config : [config];
    configs.forEach((strategyConfig) => {
      if (strategyConfig.name) {
        passport.use(strategyConfig.name, strategyConfig.strategy);
      } else {
        passport.use(strategyConfig.strategy);
      }
    });
  }

  authenticate(options: AuthenticateMiddlewareOptions) {
    const self = this;
    return function (req: Request, res: Response, next: NextFunction) {
      if (options.scope || options.user) {
        passport.authenticate(options.strategy, {
          scope: options.scope,
          // state: req.user?.userId.toString()
        })(req, res, next);
      } else {
        passport.authenticate(
          options.strategy,
          function (error: unknown, user: Express.User, info?: StrategyInfo) {
            // console.log(req.cookies);
            // console.log(req.user);

            if (error) {
              if (error instanceof Error) return next(error);
              return next(new Error('Something went wrong', { cause: error }));
            }

            if (!user) {
              if (self.onUnauthorized) return next(self.onUnauthorized({ ...info, ...options }));
              return next(new Error(options.message ?? info?.message ?? 'Unauthorized'));
            }

            req.user = user;
            return next();
          }
        )(req, res, next);
      }
    };
  }
}

const auth = new Auth();
export default auth;
