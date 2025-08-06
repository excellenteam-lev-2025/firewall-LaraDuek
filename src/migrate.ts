import pool from './db';

async function createTables() {
  try {
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

    console.log('Tables ip_rules, url_rules, and port_rules created (or already existed)');
    process.exit(0);
  } catch (err) {
    console.error('Error creating tables:', err);
    process.exit(1);
  }
}

createTables();
