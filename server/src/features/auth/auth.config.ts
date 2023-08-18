import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as CustomStrategy } from 'passport-custom';
import { Request } from 'express';
import pick from 'lodash/pick';
import { StrategyConfig } from '../../lib/auth';
import xprisma from '../../config/db';
import { RegisterSchema } from './auth.schema';

export const strategyConfig: StrategyConfig[] = [
  {
    name: 'local-register',
    strategy: new CustomStrategy(
      async function (req: Request<unknown, unknown, RegisterSchema>, submit) {
        try {
          const userData = pick(req.body, ['name', 'email']);
          const accountData = pick(req.body, ['username', 'password']);
          const user = await xprisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({ data: userData });
            await tx.localAccount.create({
              data: { ...accountData, userId: newUser.id }
            });
            return newUser;
          });
          return submit(null, { id: user.id });
        } catch (error: unknown) {
          return submit(error, false);
        }
      }
    )
  },
  {
    name: 'local-login',
    strategy: new LocalStrategy(async function (username, password, submit) {
      try {
        const account = await xprisma.localAccount.findUnique({ where: { username } });
        if (!account) return submit(null, false, { message: 'Invalid Credentials' });
        const isPasswordCorrect = await account.comparePassword(password);
        if (!isPasswordCorrect) return submit(null, false, { message: 'Invalid Credentials' });
        return submit(null, { id: account.userId });
      } catch (error: unknown) {
        return submit(error, false);
      }
    })
  }
];
