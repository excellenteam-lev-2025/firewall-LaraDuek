import { Pool } from 'pg';
import { config } from './config/env';

export const pool = new Pool({ connectionString: config.databaseUri! });

async function connectWithStopAndWait(): Promise<void> {
  
  const start = Date.now();

  while (Date.now() - start < config.dbMaxWaitMs) {
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

export const dbReady = (async () => {
  await connectWithStopAndWait();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS ip_rules (
      id SERIAL PRIMARY KEY,
      value TEXT NOT NULL,
      mode VARCHAR(10) NOT NULL CHECK (mode IN ('blacklist', 'whitelist')),
      active BOOLEAN DEFAULT TRUE
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS url_rules (
      id SERIAL PRIMARY KEY,
      value TEXT NOT NULL,
      mode VARCHAR(10) NOT NULL CHECK (mode IN ('blacklist', 'whitelist')),
      active BOOLEAN DEFAULT TRUE
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS port_rules (
      id SERIAL PRIMARY KEY,
      value INTEGER NOT NULL CHECK (value >= 0 AND value <= 65535),
      mode VARCHAR(10) NOT NULL CHECK (mode IN ('blacklist', 'whitelist')),
      active BOOLEAN DEFAULT TRUE
    );
  `);

  console.log('Tables ip_rules, url_rules, and port_rules created (or already existed).');
})();