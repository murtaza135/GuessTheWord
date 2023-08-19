/* eslint-disable no-param-reassign */
import { Prisma, LocalAccount } from '@prisma/client';
import bcrypt from 'bcryptjs';

const encrpyPassword = async (password: LocalAccount['password']) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const localAccountExtension = Prisma.defineExtension({
  query: {
    // encrypt password for all queries that mutate the password
    localAccount: {
      async create({ args, query }) {
        if (args.data.password) {
          args.data = {
            ...args.data,
            password: await encrpyPassword(args.data.password),
          };
        }
        return query(args);
      },
      async update({ args, query }) {
        if (args.data.password) {
          args.data = {
            ...args.data,
            password: await encrpyPassword(args.data.password.toString()),
          };
        }
        return query(args);
      },
      async updateMany({ args, query }) {
        if (args.data.password) {
          args.data = {
            ...args.data,
            password: await encrpyPassword(args.data.password.toString()),
          };
        }
        return query(args);
      },
      async upsert({ args, query }) {
        if (args.update.password) {
          args.update = {
            ...args.update,
            password: await encrpyPassword(args.update.password.toString()),
          };
        }
        return query(args);
      },
    }
  },
  result: {
    localAccount: {
      comparePassword: {
        needs: { password: true },
        compute(account) {
          return async (password: LocalAccount['password']) => {
            return bcrypt.compare(password, account.password);
          };
        },
      }
    }
  }
});

export default localAccountExtension;
