import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as CustomStrategy } from 'passport-custom';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GithubStrategy, Profile as GithubProfile } from 'passport-github2';
import { VerifyCallback } from 'passport-oauth2';
import { Request } from 'express';
import { User } from '@prisma/client';
import { Profile } from 'passport';
import { StrategyConfig } from '../../lib/auth';
import xprisma from '../../config/db';
import { RegisterSchema } from './auth.schema';
import config from '../../config/config';
import authServices from './auth.services';

type JwtUserId = { userId: User['userId']; };

const profileUtil = {
  getName(profile: Profile) {
    if (profile.name?.familyName) {
      if (profile.name?.familyName && profile.name?.givenName) {
        return `${profile.name.givenName} ${profile.name.familyName}`;
      }
    }
    if (profile.name?.givenName) return profile.name.givenName;
    if (profile.name?.familyName) return profile.name.familyName;
    return null;
  },
  getEmail(profile: Profile) {
    if (profile.emails && profile.emails.length > 0) {
      return profile.emails[0].value ?? null;
    }
    return null;
  },
  getImage(profile: Profile) {
    if (profile.photos && profile.photos.length > 0) {
      return profile.photos[0].value ?? null;
    }
    return null;
  }
};

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
          const account = await xprisma.user.findUnique(
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
          const account = await xprisma.oAuthAccount.findUnique({
            where: {
              provider_providerAccountId: {
                provider: profile.provider,
                providerAccountId: profile.id
              }
            }
          });
          if (account) return submit(null, { userId: account.userId });

          const userData = {
            name: profileUtil.getName(profile) ?? profile.displayName ?? profile.username ?? 'Unknown',
            email: profileUtil.getEmail(profile),
            image: profileUtil.getImage(profile)
          };

          const oauthAccountData = {
            providerAccountId: profile.id,
            provider: profile.provider,
            username: profile.username
          };

          const account2 = await xprisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({ data: userData });
            const newAccount = await tx.oAuthAccount.create({
              data: { ...oauthAccountData, userId: newUser.userId }
            });
            return newAccount;
          });

          return submit(null, { userId: account2.userId });
        } catch (error: unknown) {
          return submit(error as Error);
        }
      }
    )
  }
];
