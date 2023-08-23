import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as CustomStrategy } from 'passport-custom';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as GithubStrategy, Profile as GithubProfile } from 'passport-github2';
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20';
import { VerifyCallback } from 'passport-oauth2';
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
        // TODO move function out and clean up
        jwtFromRequest: (req: Request) => {
          if (req && req.cookies) {
            return req.cookies[config.ACCESS_TOKEN_COOKIE_NAME];
          }
          return null;
        },
        // TODO add secretOrKeyProvider instead of secretOrKey?
        secretOrKey: config.ACCESS_TOKEN_SECRET,
        jsonWebTokenOptions: { maxAge: config.ACCESS_TOKEN_MAX_AGE }
      },
      async function (jwtPayload: JwtUserId, submit) {
        try {
          const user = await xprisma.user.findUnique(
            { where: { userId: jwtPayload.userId } }
          );
          if (!user) return submit(null, false);
          return submit(null, { userId: user.userId });
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
  },
  {
    name: 'github',
    strategy: new GithubStrategy(
      {
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
        callbackURL: `${config.API_URL}/auth/callback/github`
      },
      async function (
        accessToken: string,
        refreshToken: string,
        profile: GithubProfile,
        submit: VerifyCallback,
      ) {
        try {
          const existingAccount = await authServices.oauthLogin(profile);
          if (existingAccount) return submit(null, { userId: existingAccount.userId });
          const newAccount = await authServices.oauthRegister(profile);
          return submit(null, { userId: newAccount.userId });
        } catch (error: unknown) {
          if (error instanceof Error) return submit(error);
          return submit(new Error('Something went wrong', { cause: error }));
        }
      }
    )
  },
  {
    name: 'google',
    strategy: new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: `${config.API_URL}/auth/callback/google`
      },
      async function (
        accessToken: string,
        refreshToken: string,
        profile: GoogleProfile,
        submit: VerifyCallback,
      ) {
        try {
          const existingAccount = await authServices.oauthLogin(profile);
          if (existingAccount) return submit(null, { userId: existingAccount.userId });
          const newAccount = await authServices.oauthRegister(profile);
          return submit(null, { userId: newAccount.userId });
        } catch (error: unknown) {
          if (error instanceof Error) return submit(error);
          return submit(new Error('Something went wrong', { cause: error }));
        }
      }
    )
  }
];
