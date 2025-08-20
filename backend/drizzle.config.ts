import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { config } from './src/config/env';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/migrations',
  dbCredentials: { url: config.databaseUri! },
  verbose: true,
  strict: true,
});
