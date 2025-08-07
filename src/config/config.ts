import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: 5000,
  db: {
    user: 'lara',
    password: 'lara123',
    host: 'localhost',
    port: 5433,
    name: 'dbname',
  },
};
