import { Strategy as LocalStrategy } from 'passport-local';
import { StrategyConfig } from '../../lib/auth';
import xprisma from '../../config/db';

export const strategyConfig: StrategyConfig[] = [
  {
    name: 'local-login',
    strategy: new LocalStrategy(async function (username, password, submit) {
      try {
        const user = await xprisma.localAccount.findUnique({ where: { username } });
        if (!user) return submit(null, false, { message: 'no user on line 10' });
        if (password !== user.password) return submit(null, false);
        return submit(null, user);
      } catch (error: unknown) {
        return submit(error, false, { message: 'error on line 14' });
      }
    })
  }
];
