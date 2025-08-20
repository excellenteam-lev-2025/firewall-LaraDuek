import 'server-only';
import { createLogger, format, transports, Logger } from 'winston';
import { config } from './env';
import path from 'node:path';
import fs from 'node:fs';

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
);

class AppLogger {
  private static instance: Logger;
  private constructor() {}

  public static getInstance(): Logger {
    if (!AppLogger.instance) {
      AppLogger.instance = createLogger({
        level: config.env === 'prod' ? 'info' : 'debug',
        format: logFormat,
        transports: [new transports.Console({ format: format.combine(format.colorize(), logFormat) })],
        exitOnError: false
      });
      if (!(logger as any).__consolePatched) {
        console.log = (...args) => logger.info(args.join(' '));
        console.error = (...args) => logger.error(args.join(' '));
        console.warn = (...args) => logger.warn(args.join(' '));
        console.debug = (...args) => logger.debug(args.join(' '));
        (logger as any).__consolePatched = true;
      }
      AppLogger.instance = logger;
    }
    return AppLogger.instance;
  }
}

export const logger = AppLogger.getInstance();
export default logger;
