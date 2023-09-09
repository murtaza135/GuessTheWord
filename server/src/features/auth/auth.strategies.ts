import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as CustomStrategy } from 'passport-custom';
import { Strategy as GithubStrategy, Profile as GithubProfile } from 'passport-github2';
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20';
import { VerifyCallback } from 'passport-oauth2';
import { Request } from 'express';
import passport from 'passport';
import { CreateSchema } from './auth.schema';
import config from '../../config/config';
import * as authServices from './auth.services';
import APIError from '../../errors/APIError';

export type Strategy = typeof strategies[number]['name'];

const strategies = [
  {
    name: 'protect',
    strategy: new CustomStrategy(
      async function (req: Request, submit) {
        const payload = authServices.verifyAccessToken(req.session?.accessToken);
        if (!payload) return submit(null, null);
        return submit(null, payload);
      }
    )
  },
  {
    name: 'local-register',
    strategy: new CustomStrategy(
      async function (req: Request<unknown, unknown, CreateSchema>, submit) {
        try {
          const userId = await authServices.localRegister(req.body);
          return submit(null, { userId });
        } catch (error: unknown) {
          return submit(error, false);
        }
      }
    )
  },
  {
    name: 'local-link',
    strategy: new CustomStrategy(
      async function (req: Request<unknown, unknown, CreateSchema>, submit) {
        try {
          if (!req.user) return submit(new Error('req.user does not exist in local-authorize in auth.strategies.ts'));
          const userId = await authServices.localLink(req.user.userId, req.body);
          if (!userId) return submit(new APIError({ statusText: 'Bad Request' }));
          return submit(null, { userId });
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
        const userId = await authServices.localLogin({ username, password });
        if (!userId) return submit(null, false);
        return submit(null, { userId });
      } catch (error: unknown) {
        return submit(error, false);
      }
    })
  },
  {
    name: 'github-login',
    strategy: new GithubStrategy(
      {
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
        callbackURL: `${config.API_URL}/auth/github/login/callback`,
        passReqToCallback: true
      },
      async function (
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: GithubProfile,
        submit: VerifyCallback,
      ) {
        try {
          const userId = await authServices.oAuthLogin(profile);
          if (userId) return submit(null, { userId });
          const newUserId = await authServices.oAuthRegister(profile);
          return submit(null, { userId: newUserId });
        } catch (error: unknown) {
          if (error instanceof Error) return submit(error);
          return submit(new Error('Something went wrong', { cause: error }));
        }
      }
    )
  },
  {
    name: 'github-link',
    strategy: new GithubStrategy(
      {
        clientID: config.GITHUB_CLIENT_ID_AUTHORIZE,
        clientSecret: config.GITHUB_CLIENT_SECRET_AUTHORIZE,
        callbackURL: `${config.API_URL}/auth/github/link/callback`,
        passReqToCallback: true
      },
      async function (
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: GithubProfile,
        submit: VerifyCallback,
      ) {
        try {
          if (!req.user) return submit(new Error('Could not extract userId from req.user after oauth authentication'));
          const userId = await authServices.oAuthLink(req.user.userId, profile);
          if (!userId) return submit(new APIError({ statusText: 'Forbidden', message: 'Cannot connect OAuth account' }));
          return submit(null, { userId });
        } catch (error: unknown) {
          if (error instanceof Error) return submit(error);
          return submit(new Error('Something went wrong', { cause: error }));
        }
      }
    )
  },
  {
    name: 'google-login',
    strategy: new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: `${config.API_URL}/auth/google/login/callback`
      },
      async function (
        accessToken: string,
        refreshToken: string,
        profile: GoogleProfile,
        submit: VerifyCallback,
      ) {
        try {
          const userId = await authServices.oAuthLogin(profile);
          if (userId) return submit(null, { userId });
          const newUserId = await authServices.oAuthRegister(profile);
          return submit(null, { userId: newUserId });
        } catch (error: unknown) {
          if (error instanceof Error) return submit(error);
          return submit(new Error('Something went wrong', { cause: error }));
        }
      }
    )
  }
] as const;

export default function initAuthStrategies() {
  strategies.forEach(({ name, strategy }) => {
    if (name) {
      passport.use(name, strategy);
    } else {
      passport.use(strategy);
    }
  });
}
