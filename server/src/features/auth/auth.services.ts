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

async function localRegister(data: RegisterSchema) {
  const userData = pick(data, ['name', 'email']);
  const accountData = pick(data, ['username', 'password']);
  const account = await xprisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({ data: userData });
    const newAccount = await tx.localAccount.create({
      data: { ...accountData, userId: newUser.userId }
    });
    return newAccount;
  });
  return account;
}

async function localLogin(data: LoginSchema) {
  const account = await xprisma.localAccount.findUnique({ where: { username: data.username } });
  if (!account) return null;
  const isPasswordCorrect = await account.comparePassword(data.password);
  if (!isPasswordCorrect) return null;
  return account;
}

async function oauthRegister(profile: Profile) {
  const { userData, accountData } = authUtils.transformProfile(profile);

  // TODO convert transaction to prisma's nested statement queries
  const account = await xprisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({ data: userData });
    const newAccount = await tx.oAuthAccount.create({
      data: { ...accountData, userId: newUser.userId }
    });
    return newAccount;
  });

  return account;
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
  return account;
}

// TODO figure out a way to return user via req.user instead of making an extra request to the db
async function getUser(userId: User['userId']) {
  const user = await xprisma.user.findUniqueOrThrow({
    where: { userId },
    select: { userId: true, name: true, email: true, image: true }
  });
  return user;
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
