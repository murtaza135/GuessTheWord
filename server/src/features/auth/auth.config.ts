import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import xprisma from '../../config/db';

// TODO make this cleaner, find a better way to declaring passport strategies
export default function initPassport() {
  passport.use('local-login', new LocalStrategy(async function (username, password, done) {
    try {
      const user = await xprisma.localAccount.findUnique({ where: { username } });
      if (!user) return done(null, false, { message: 'no user on line 10' });
      if (password !== user.password) return done(null, false);
      return done(null, user);
    } catch (error: unknown) {
      return done(error, false, { message: 'error on line 14' });
    }
  }));
}

export const strategyConfig = [
  {
    name: 'local-login',
    strategy: new LocalStrategy(async function (username, password, done) {
      try {
        const user = await xprisma.localAccount.findUnique({ where: { username } });
        if (!user) return done(null, false, { message: 'no user on line 10' });
        if (password !== user.password) return done(null, false);
        return done(null, user);
      } catch (error: unknown) {
        return done(error, false, { message: 'error on line 14' });
      }
    })
  }
];
