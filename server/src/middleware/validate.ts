import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, SafeParseSuccess, SafeParseError } from 'zod';
import APIError from '../errors/APIError';

function createValidator(reqAttribute: 'body' | 'query' | 'params') {
  return function (
    zodSchema: ZodTypeAny | ZodTypeAny[],
    options: { transform?: boolean; } = { transform: true }
  ) {
    return function (req: Request, res: Response, next: NextFunction) {
      const schemaArray = zodSchema instanceof Array ? zodSchema : [zodSchema];
      const parsedArray = schemaArray.map((schema) => schema.safeParse(req[reqAttribute]));
      const success = parsedArray.every((parsed) => parsed.success);

      if (success) {
        if (options.transform) {
          const parsedArraySuccess = parsedArray as SafeParseSuccess<any>[];
          const data = parsedArraySuccess.reduce((acc, parsed) => ({ ...acc, ...parsed.data }), {});
          req[reqAttribute] = data || req[reqAttribute];
        }
      }

      if (!success) {
        const parsedArrayError = parsedArray.filter(
          (parsed) => !parsed.success
        ) as SafeParseError<any>[];
        const issues = parsedArrayError.flatMap((error) => error.error.issues);

        const errorFieldEntries = issues.map((issue) => {
          const key = issue.path.toString().replaceAll(',', '.');
          if (!key) throw new Error(`Invalid Zod Schema: ${JSON.stringify(issue)}`);
          return [key, issue.message];
        });
        const errorFields: Record<string, string> = Object.fromEntries(errorFieldEntries);

        throw new APIError({
          statusText: 'Bad Request',
          message: 'Invalid data',
          fields: errorFields,
        });
      }

      next();
    };
  };
}

const validate = {
  body: createValidator('body'),
  query: createValidator('query'),
  params: createValidator('params'),
};

export default validate;
