import { Prisma } from '@prisma/client';
import APIError from '../../../errors/APIError';

const globalExtension = Prisma.defineExtension({
  query: {
    $allModels: {
      async $allOperations({ model, args, query }) {
        // run query for all operations, if query fails, catch error and throw APIError instead
        try {
          return await query(args);
        } catch (error: any) {
          // data could not be validated against database schema
          if (error instanceof Prisma.PrismaClientValidationError) {
            throw new APIError({
              statusText: 'Bad Request',
              message: 'Invalid data',
              cause: error
            });
          }

          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // unique constraint violation
            if (error.code === 'P2002') {
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

            // item not found
            if (error.code === 'P2025') {
              throw new APIError({
                statusText: 'Not Found',
                message: `${model} not found`,
                cause: error
              });
            }
          }

          // re-throw regular error to be handled by the error handler
          throw error;
        }
      },
    },
  }
});

export default globalExtension;
