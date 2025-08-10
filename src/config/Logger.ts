import { createLogger, format, transports } from 'winston';
import { config } from './env';
import path from 'node:path';
import fs from 'node:fs';

if (config.env === 'production') {
  const logsDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
}

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
);

const transportsFormat = config.env === 'production'
  ? [new transports.File({ filename: path.join('logs', 'app.log') })]
  : [new transports.Console({ format: format.combine(format.colorize(), logFormat) })];

export const logger = createLogger({
  level: config.env === 'production' ? 'info' : 'debug',
  format: logFormat,
  transports: transportsFormat
});

export default logger;

console.log = (...args) => logger.info(args.join(' '));
console.error = (...args) => logger.error(args.join(' '));
console.warn = (...args) => logger.warn(args.join(' '));
console.debug = (...args) => logger.debug(args.join(' '));