import { z } from 'zod';

const envSchema = z.object({
  CLIENT_URL: z.string(),
  DOMAIN_NAME_PROTOCOL: z.string(),
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['production', 'development']),
  VERSION: z.string().regex(/^[0-9]+\.[0-9]+\.[0-9]+$/), // e.g. 11.2.456
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'debug']),
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID_AUTHORIZE: z.string(),
  GITHUB_CLIENT_SECRET_AUTHORIZE: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

export default envSchema;
