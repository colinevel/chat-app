import { z } from 'zod';

export const configSchema = z.object({
  MONGODB_URI: z.string().url(),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string().min(1),
});

