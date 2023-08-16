import { z } from 'zod';

const envSchema = z.object({
  DOMAIN_NAME_PROTOCOL: z.string(),
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['production', 'development']),
  VERSION: z.string().regex(/^[0-9]+\.[0-9]+\.[0-9]+$/), // e.g. 11.2.456
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'debug'])
});

export default envSchema;