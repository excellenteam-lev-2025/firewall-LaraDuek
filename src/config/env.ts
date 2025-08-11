import 'dotenv/config';
import { z } from 'zod';


const EnvSchema = z.object({
  ENV: z.enum(['dev', 'prod'], { error: 'ENV must be dev or prod' }),
  PORT: z.coerce.number().int().min(1).max(65535),
  BASE_DATABASE_URI: z.string(),
  DB_NAME: z.string(),
  USER: z.string(),
  PASSWORD: z.string(),
  HOST: z.string(),
});

const envParsed = EnvSchema.parse(process.env);

export const config = {
  env: envParsed.ENV,               // 'dev' | 'prod'
  port: envParsed.PORT,             // number
  databaseUri: `postgres://${envParsed.USER}:${envParsed.PASSWORD}@${envParsed.HOST}:5432/${envParsed.DB_NAME}`,
  dbConnectionInterval: Number(process.env.DB_CONNECTION_INTERVAL) || 2000, // ms
  dbMaxRetries: 5,
} as const;


export const APP_NAME = 'firewalls';
export const STRINGS = {
  serverStarting: `${APP_NAME} starting...`,
  serverReady: `${APP_NAME} ready`,
  serverError: `${APP_NAME} failed to start`,
} as const;

