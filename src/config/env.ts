import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
  ENV: z.enum(['dev', 'production'], { error: 'ENV must be dev or production' }),
  PORT: z.coerce.number().int().min(1).max(65535),
  DATABASE_URI_DEV: z.string().url('DATABASE_URI_DEV must be a valid URL'),
  DATABASE_URI_PROD: z.string().url('DATABASE_URI_PROD must be a valid URL'),
});

const env = EnvSchema.parse(process.env);

const DATABASE_URI = env.ENV === 'production' ? env.DATABASE_URI_PROD : env.DATABASE_URI_DEV;


export const APP_NAME = 'firewalls';
export const STRINGS = {
  serverStarting: `${APP_NAME} starting...`,
  serverReady: `${APP_NAME} ready`,
  serverError: `${APP_NAME} failed to start`,
} as const;


export const config = {
  env: env.ENV,               // 'dev' | 'production'
  port: env.PORT,             // number
  databaseUri: DATABASE_URI,  // string
  dbConnectionInterval: Number(process.env.DB_CONNECTION_INTERVAL) || 2000, // ms
} as const;
