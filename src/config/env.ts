import 'dotenv/config'; 
import {z} from 'zod';

const envSchema = z.object({
    ENV: z.enum(['dev', 'production'], { error: 'ENV is required' }),
    PORT: z.coerce.number().int().min(1).max(65535),
    DATABASE_URI: z.string().url().optional(),
    DATABASE_URI_DEV: z.string().url().optional(),
    DATABASE_URI_PRODUCTION: z.string().url().optional(),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1); 
}

const env = parsed.data;
function pickDatabaseUri() {
  const byEnv = env.ENV === 'dev' ? env.DATABASE_URI_DEV : env.DATABASE_URI_PRODUCTION;
  const chosen = byEnv ?? env.DATABASE_URI; 

  const ok = z.string().url().safeParse(chosen);
  if (!ok.success) {
    throw new Error('DATABASE URI missing/invalid for current ENV');
  }
  return ok.data;
}

export const config = {
    env: env.ENV,
    isDev: env.ENV === 'dev',
    isProd: env.ENV === 'production',
    server: { port: env.PORT },
    db: { uri: pickDatabaseUri() },
} as const;
