import { Pool } from 'pg';
import { config } from './config/config';

const pool = new Pool({
  user: config.db.user,
  password: config.db.password,
  host: config.db.host,
  port: config.db.port,
  database: config.db.name,
});

export default pool;

