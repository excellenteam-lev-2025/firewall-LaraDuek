import { Pool } from 'pg';
import { config } from './config/env';
import { drizzle } from 'drizzle-orm/node-postgres';

export const pool = new Pool({ connectionString: config.databaseUri! });

export const db = drizzle(pool);

export async function dbReady(): Promise<void> {
  for (let i = 0; i < config.dbMaxRetries; i++) {
    try {
      await pool.query('SELECT 1');
      console.log('DB connection ACK');
      return;
    } catch (err) {
      console.error(`DB not ready. Retrying in ${config.dbConnectionInterval}ms...`);
      await new Promise((resolve) =>
        setTimeout(resolve, config.dbConnectionInterval)
      );
    }
  }
}


