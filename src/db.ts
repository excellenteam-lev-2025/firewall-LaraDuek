import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from './config/env';

class Database {
  private static pool: Pool;
  private static db: ReturnType<typeof drizzle>;

  private constructor() {}

  static getPool() {
    if (!this.pool) {
      this.pool = new Pool({ connectionString: config.databaseUri! });
    }
    return this.pool;
  }

  static getDb() {
    if (!this.db) {
      this.db = drizzle(this.getPool());
    }
    return this.db;
  }

  static async ready() {
    for (let i = 0; i < config.dbMaxRetries; i++) {
      try {
        await this.getPool().query('SELECT 1');
        console.log('DB connection ACK');
        return;
      } catch {
        console.error(`DB not ready. Retrying in ${config.dbConnectionInterval}ms...`);
        await new Promise((r) => setTimeout(r, config.dbConnectionInterval));
      }
    }
  }
}

export const pool = Database.getPool();
export const db = Database.getDb();
export const dbReady = () => Database.ready();


