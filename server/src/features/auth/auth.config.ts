import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as CustomStrategy } from 'passport-custom';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { User } from '@prisma/client';
import { StrategyConfig } from '../../lib/auth';
import xprisma from '../../config/db';
import { RegisterSchema } from './auth.schema';
import config from '../../config/config';
import authServices from './auth.services';

type JwtUserId = { userId: User['userId']; };

export const strategyConfig: StrategyConfig[] = [
  {
    name: 'protect',
    strategy: new JwtStrategy(
      {
        // TODO add secretOrKeyProvider instead of secretOrKey?
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.ACCESS_TOKEN_SECRET,
        jsonWebTokenOptions: { maxAge: config.ACCESS_TOKEN_MAX_AGE }
      },
      async function (jwtPayload: JwtUserId, submit) {
        try {
          const account = await xprisma.localAccount.findUnique(
            { where: { userId: jwtPayload.userId } }
          );
          if (!account) return submit(null, false);
          return submit(null, { userId: account.userId });
        } catch (error: unknown) {
          return submit(error, false);
        }
      }
    )
  },
  {
    name: 'local-register',
    strategy: new CustomStrategy(
      async function (req: Request<unknown, unknown, RegisterSchema>, submit) {
        try {
          const account = await authServices.localRegister(req.body);
          return submit(null, { id: account.userId });
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
        const account = await authServices.localLogin({ username, password });
        if (!account) return submit(null, false, { message: 'Invalid Credentials' });
        return submit(null, { userId: account.userId });
      } catch (error: unknown) {
        return submit(error, false);
      }
    })
  }
];