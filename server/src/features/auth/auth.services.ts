import jwt from 'jsonwebtoken';
import pick from 'lodash/pick';
import { User } from '@prisma/client';
import { Profile } from 'passport';
import config from '../../config/config';
import * as authSchemas from './auth.schema';
import { LoginSchema, RegisterSchema } from './auth.schema';
import xprisma from '../../config/db';
import * as authUtils from './auth.utils';

export function generateAccessToken(userId: User['userId']) {
  return jwt.sign(
    { userId },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: config.ACCESS_TOKEN_MAX_AGE },
  );
}

export function verifyAccessToken(accessToken: string | null | undefined) {
  if (!accessToken) return null;
  try {
    const payload = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
    const verifiedPayload = authSchemas.userId.parse(payload);
    return verifiedPayload;
  } catch (error: unknown) {
    return null;
  }
}

export async function getUser(userId: User['userId']) {
  const user = await xprisma.user.findUnique({
    where: { userId },
    select: { userId: true, name: true, email: true, image: true }
  });
  return user;
}

export async function getLocalAccount(userId: User['userId']) {
  const localAccount = await xprisma.localAccount.findUnique({
    where: { userId },
    select: { username: true },
  });
  return localAccount;
}

export async function getOAuthAccounts(userId: User['userId']) {
  const oAuthAccounts = await xprisma.oAuthAccount.findMany({
    where: { userId },
    select: { username: true, provider: true }
  });

  return oAuthAccounts;
}

// TODO use upsert instead of create and merge localAuthorize and localRegister together
export async function localRegister(data: RegisterSchema) {
  const userData = pick(data, ['name', 'email']);
  const accountData = pick(data, ['username', 'password']);
  const userId = await xprisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: userData,
      select: { userId: true }
    });
    await tx.localAccount.create({
      data: { ...accountData, userId: newUser.userId }
    });
    return newUser.userId;
  });
  return userId;
}

export async function localLogin(data: LoginSchema) {
  const account = await xprisma.localAccount.findUnique({ where: { username: data.username } });
  if (!account) return null;
  const isPasswordCorrect = await account.comparePassword(data.password);
  if (!isPasswordCorrect) return null;
  const user = await getUser(account.userId);
  if (!user) throw new Error(`User ${account.userId} is null despite the existence of LocalAccount ${account.accountId}`);
  return user.userId;
}

export async function localAuthorize(userId: User['userId'], data: RegisterSchema) {
  const oldAccount = await xprisma.localAccount.findUnique({ where: { userId } });
  if (oldAccount) return null;
  const userData = pick(data, ['name', 'email']);
  const accountData = pick(data, ['username', 'password']);
  await xprisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { userId },
      data: userData
    });
    await tx.localAccount.create({
      data: { ...accountData, userId }
    });
  });
  return userId;
}

export async function oauthRegister(profile: Profile) {
  const { userData, accountData } = authUtils.transformProfile(profile);

  // TODO convert transaction to prisma's nested statement queries
  const userId = await xprisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: userData,
      select: { userId: true }
    });
    await tx.oAuthAccount.create({
      data: { ...accountData, userId: newUser.userId }
    });
    return newUser.userId;
  });

  return userId;
}

export async function oauthLogin(profile: Profile) {
  const account = await xprisma.oAuthAccount.findUnique({
    where: {
      provider_accountId: {
        provider: profile.provider,
        accountId: profile.id
      }
    }
  });
  if (!account) return null;
  const user = await getUser(account.userId);
  if (!user) throw new Error(`User ${account.userId} is null despite the existence of LocalAccount ${account.accountId}`);
  return user.userId;
}

export async function oauthAuthorize(userId: User['userId'], profile: Profile) {
  const account = await xprisma.oAuthAccount.findUnique({
    where: {
      provider_accountId: {
        provider: profile.provider,
        accountId: profile.id
      }
    }
  });
  if (account) return null;

  const { accountData } = authUtils.transformProfile(profile);

  await xprisma.user.update({
    where: { userId },
    data: { Account: { create: accountData } },
  });

  return userId;
}
