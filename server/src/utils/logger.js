// Logging Utility
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOG_DIR = path.join(__dirname, '../../logs');

// Ensure logs directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
  SUCCESS: 'SUCCESS',
};

const LOG_COLORS = {
  ERROR: '\x1b[31m', // Red
  WARN: '\x1b[33m', // Yellow
  INFO: '\x1b[36m', // Cyan
  DEBUG: '\x1b[35m', // Magenta
  SUCCESS: '\x1b[32m', // Green
  RESET: '\x1b[0m', // Reset
};

class Logger {
  constructor(name) {
    this.name = name;
  }

  getTimestamp() {
    return new Date().toISOString();
  }

  formatMessage(level, message, data = null) {
    const timestamp = this.getTimestamp();
    const color = LOG_COLORS[level];
    const dataStr = data ? `\n${JSON.stringify(data, null, 2)}` : '';
    return {
      timestamp,
      level,
      name: this.name,
      message,
      data,
      formatted: `${color}[${timestamp}] [${level}] [${this.name}] ${message}${dataStr}${LOG_COLORS.RESET}`,
      logFile: `[${timestamp}] [${level}] [${this.name}] ${message}${dataStr ? `\n${JSON.stringify(data, null, 2)}` : ''}`,
    };
  }

  writeToFile(formatted) {
    const fileName = `app-${new Date().toISOString().split('T')[0]}.log`;
    const filePath = path.join(LOG_DIR, fileName);

    fs.appendFile(filePath, formatted.logFile + '\n\n', (err) => {
      if (err) {
        console.error('Failed to write to log file:', err);
      }
    });
  }

  error(message, data) {
    const formatted = this.formatMessage(LOG_LEVELS.ERROR, message, data);
    console.error(formatted.formatted);
    this.writeToFile(formatted);
  }

  warn(message, data) {
    const formatted = this.formatMessage(LOG_LEVELS.WARN, message, data);
    console.warn(formatted.formatted);
    this.writeToFile(formatted);
  }

  info(message, data) {
    const formatted = this.formatMessage(LOG_LEVELS.INFO, message, data);
    console.log(formatted.formatted);
    this.writeToFile(formatted);
  }

  debug(message, data) {
    if (process.env.NODE_ENV === 'development') {
      const formatted = this.formatMessage(LOG_LEVELS.DEBUG, message, data);
      console.log(formatted.formatted);
      this.writeToFile(formatted);
    }
  }

  success(message, data) {
    const formatted = this.formatMessage(LOG_LEVELS.SUCCESS, message, data);
    console.log(formatted.formatted);
    this.writeToFile(formatted);
  }
}

// Create logger instance
export const createLogger = (name) => new Logger(name);

// Global logger
export const logger = new Logger('SYSTEM');

export default Logger;
