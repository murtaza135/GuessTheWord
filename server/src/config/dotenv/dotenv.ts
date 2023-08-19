import path from 'path';
import dotenv from 'dotenv';
import { ZodError } from 'zod';
import envSchema from './env-schema';

class EnvError extends Error {
  public readonly envFieldErrors: Record<string, unknown>;

  constructor(zodError: ZodError) {
    super();
    this.envFieldErrors = zodError.flatten().fieldErrors;
  }
}

// load .env file
const CONFIG_PATH = path.join(__dirname, '..', '..', '..', '.env');
dotenv.config({ path: CONFIG_PATH });

// validate process.env against the envSchema using zod,
// allowing typesafe environment variables to be used
// @inspiration: https://dev.to/asjadanis/parsing-env-with-typescript-3jjm
const result = envSchema.safeParse(process.env);

// if .env cannot be validated, then throw error before server gets a chance to run
if (!result.success) {
  throw new EnvError(result.error);
}

const env = result.data;

export default env;
