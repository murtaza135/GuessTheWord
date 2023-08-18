import { Express, Request, Response, NextFunction } from 'express';
import passport, { Strategy } from 'passport';
import APIError from '../../errors/APIError';

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

type StrategyConfig = {
  name?: string;
  strategy: Strategy;
};

export function initAuth(config: StrategyConfig | StrategyConfig[]) {
  const allConfigs = config instanceof Array ? config : [config];
  allConfigs.forEach((configItem) => {
    if (configItem.name) {
      passport.use(configItem.name, configItem.strategy);
    } else {
      passport.use(configItem.strategy);
    }
  });
}
