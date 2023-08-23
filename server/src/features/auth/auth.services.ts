import jwt from 'jsonwebtoken';
import pick from 'lodash/pick';
import { User } from '@prisma/client';
import { Profile } from 'passport';
import config from '../../config/config';
import { LoginSchema, RegisterSchema } from './auth.schema';
import xprisma from '../../config/db';
import * as authUtils from './auth.utils';

function generateAccessToken(userId: User['userId']) {
  return jwt.sign(
    { userId },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: config.ACCESS_TOKEN_MAX_AGE },
  );
}

// TODO figure out a way to return user via req.user instead of making an extra request to the db
async function getUser(userId: User['userId']) {
  const user = await xprisma.user.findUnique({
    where: { userId },
    select: { userId: true, name: true, email: true, image: true }
  });
  return user;
}

async function localRegister(data: RegisterSchema) {
  const userData = pick(data, ['name', 'email']);
  const accountData = pick(data, ['username', 'password']);
  const { user, account } = await xprisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: userData,
      select: { userId: true, name: true, email: true, image: true }
    });
    const newAccount = await tx.localAccount.create({
      data: { ...accountData, userId: newUser.userId }
    });
    return { user: newUser, account: newAccount };
  });
  return { user, account };
}

async function localLogin(data: LoginSchema) {
  const account = await xprisma.localAccount.findUnique({ where: { username: data.username } });
  if (!account) return { user: null, account: null };
  const isPasswordCorrect = await account.comparePassword(data.password);
  if (!isPasswordCorrect) return { user: null, account: null };
  const user = await getUser(account.userId);
  if (!user) throw new Error(`User ${account.userId} is null despite the existence of LocalAccount ${account.accountId}`);
  return { user, account };
}

async function oauthRegister(profile: Profile) {
  const { userData, accountData } = authUtils.transformProfile(profile);

  // TODO convert transaction to prisma's nested statement queries
  const { user, account } = await xprisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: userData,
      select: { userId: true, name: true, email: true, image: true }
    });
    const newAccount = await tx.oAuthAccount.create({
      data: { ...accountData, userId: newUser.userId }
    });
    return { user: newUser, account: newAccount };
  });

  return { user, account };
}

async function oauthLogin(profile: Profile) {
  const account = await xprisma.oAuthAccount.findUnique({
    where: {
      provider_accountId: {
        provider: profile.provider,
        accountId: profile.id
      }
    }
  });
  if (!account) return { user: null, account: null };
  const user = await getUser(account.userId);
  if (!user) throw new Error(`User ${account.userId} is null despite the existence of LocalAccount ${account.accountId}`);
  return { user, account };
}

const authServices = {
  generateAccessToken,
  localRegister,
  localLogin,
  oauthRegister,
  oauthLogin,
  getUser
};

export default authServices;
