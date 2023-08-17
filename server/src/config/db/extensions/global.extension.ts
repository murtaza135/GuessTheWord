import { Prisma } from '@prisma/client';
import APIError from '../../../errors/APIError';

const globalExtension = Prisma.defineExtension({
  query: {
    $allModels: {
      async $allOperations({ model, args, query }) {
        try {
          return await query(args);
        } catch (error: any) {
          if (error instanceof Prisma.PrismaClientValidationError) {
            throw new APIError({
              statusText: 'Bad Request',
              message: 'Invalid data',
              cause: error
            });
          }

          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002' /* unique constraint violation */) {
              const fields: Record<string, string> = Object.fromEntries(
                (error.meta?.target as Array<string>).map((field) => [
                  field, `${field} is taken`
                ])
              );

              throw new APIError({
                statusText: 'Bad Request',
                message: 'Non-unique data',
                cause: error,
                fields
              });
            }

            if (error.code === 'P2025' /* item not found */) {
              throw new APIError({
                statusText: 'Not Found',
                message: `${model} not found`,
                cause: error
              });
            }

            if (error.code.startsWith('P2') /* invalid query */) {
              throw new APIError({
                statusText: 'Internal Server Error',
                message: 'Your request cannot be processed at this time',
                cause: error
              });
            }
          }

          throw error;
        }
      },
    },
  }
});

export default globalExtension;
