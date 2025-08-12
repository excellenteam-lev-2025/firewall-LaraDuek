import 'dotenv/config';
import { z } from 'zod';


const EnvSchema = z.object({
  ENV: z.enum(['dev', 'prod'], { error: 'ENV must be dev or prod' }),
  PORT: z.coerce.number().int().min(1).max(65535),
  DB_NAME: z.string(),
  USER: z.string(),
  PASSWORD: z.string(),
  HOST: z.string(),
  DB_PORT: z.coerce.number().int().min(1).max(65535),
  DB_CONNECTION_INTERVAL: z.coerce.number().int(),
  DB_MAX_CONNECTIONS_RETRIES: z.coerce.number().int().min(0)
});

const envParsed = EnvSchema.parse(process.env);

export const config = {
  env: envParsed.ENV,               // 'dev' | 'prod'
  port: envParsed.PORT,             // number
  databaseUri: `postgres://${envParsed.USER}:${envParsed.PASSWORD}@${envParsed.HOST}:${envParsed.DB_PORT}/${envParsed.DB_NAME}${envParsed.ENV}`,
  dbConnectionInterval: envParsed.DB_CONNECTION_INTERVAL, // ms
  dbMaxRetries: envParsed.DB_MAX_CONNECTIONS_RETRIES,
} as const;


export const APP_NAME = 'firewalls';
export const STRINGS = {
  serverStarting: `${APP_NAME} starting...`,
  serverReady: `${APP_NAME} ready`,
  serverError: `${APP_NAME} failed to start`,
} as const;

