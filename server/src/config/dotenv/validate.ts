import './dotenv';
import { z, AnyZodObject, ZodError } from 'zod';

class EnvError extends Error {
  public readonly envFieldErrors: Record<string, unknown>;

  constructor(zodError: ZodError) {
    super();
    this.envFieldErrors = zodError.flatten().fieldErrors;
  }
}

// validate process.env against the envSchema using zod,
// allowing typesafe environment variables to be used
// @inspiration: https://dev.to/asjadanis/parsing-env-with-typescript-3jjm
export default function validateEnv<T extends AnyZodObject>(schema: T): z.infer<T> {
  const result = schema.safeParse(process.env);

  if (!result.success) {
    throw new EnvError(result.error);
  }

  return result.data;
}
