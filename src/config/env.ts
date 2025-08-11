import 'dotenv/config';
import { z } from 'zod';


const EnvSchema = z.object({
  ENV: z.enum(['dev', 'prod'], { error: 'ENV must be dev or prod' }),
  PORT: z.coerce.number().int().min(1).max(65535),
  BASE_DATABASE_URI: z.string().url(),
  DB_NAME: z.string(),
});

const envParsed = EnvSchema.parse(process.env);
const u = new URL(envParsed.BASE_DATABASE_URI);
u.pathname = '/' + envParsed.DB_NAME + envParsed.ENV;

export const config = {
  env: envParsed.ENV,               // 'dev' | 'prod'
  port: envParsed.PORT,             // number
  databaseUri: u.toString(),  // string
  dbConnectionInterval: Number(process.env.DB_CONNECTION_INTERVAL) || 2000, // ms
  dbMaxWaitMs: 30000,         // ms
} as const;


export const APP_NAME = 'firewalls';
export const STRINGS = {
  serverStarting: `${APP_NAME} starting...`,
  serverReady: `${APP_NAME} ready`,
  serverError: `${APP_NAME} failed to start`,
} as const;

