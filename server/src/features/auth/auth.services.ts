import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { Profile } from 'passport';
import config from '../../config/config';
import * as authSchemas from './auth.schema';
import { LoginSchema, CreateLocalAccountSchema } from './auth.schema';
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

export async function localRegister(
  { name, email, username, password }: CreateLocalAccountSchema
) {
  // NOTE for some reason prisma does not run the query extensions implemented in xprisma
  // NOTE the query extension is required for automatically encrypting the password
  // NOTE therefore the query must be run via transactions
  const userId = await xprisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: { name, email },
      select: { userId: true }
    });

    await tx.localAccount.create({
      data: { userId: newUser.userId, username, password }
    });

    return newUser.userId;
  });

  return userId;
}

export async function localLogin({ username, password }: LoginSchema) {
  const account = await xprisma.localAccount.findUnique({ where: { username } });
  if (!account) return null;

  const isPasswordCorrect = await account.comparePassword(password);
  if (!isPasswordCorrect) return null;

  const user = await getUser(account.userId);
  if (!user) {
    throw new Error(
      `User ${account.userId} is null despite the existence of LocalAccount ${account.accountId}`
    );
  }

  return user.userId;
}

export async function localLink(
  userId: User['userId'],
  { name, email, username, password }: CreateLocalAccountSchema
) {
  const oldAccount = await xprisma.localAccount.findUnique({ where: { userId } });
  if (oldAccount) return null;

  await xprisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { userId },
      data: { name, email }
    });

    await tx.localAccount.create({
      data: { userId, username, password }
    });
  });

  return userId;
}

export async function oAuthRegister(profile: Profile) {
  const { userData, accountData } = authUtils.transformProfile(profile);

  const user = await xprisma.user.create({
    data: { ...userData, oAuthAccounts: { create: [accountData] } },
    select: { userId: true }
  });

  return user.userId;
}

export async function oAuthLogin(profile: Profile) {
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
  if (!user) {
    throw new Error(
      `User ${account.userId} is null despite the existence of LocalAccount ${account.accountId}`
    );
  }

  return user.userId;
}

export async function oAuthLink(userId: User['userId'], profile: Profile) {
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
    data: { oAuthAccounts: { create: accountData } },
  });

  return userId;
}
