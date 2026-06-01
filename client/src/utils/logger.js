// Client-side Logger
class ClientLogger {
  constructor(name) {
    this.name = name;
  }

  getTimestamp() {
    return new Date().toISOString();
  }

  log(level, message, data = null) {
    const timestamp = this.getTimestamp();
    const logEntry = {
      timestamp,
      level,
      module: this.name,
      message,
      data,
    };

    // Log to console
    const style = this.getConsoleStyle(level);
    console.log(
      `%c[${timestamp}] [${level}] [${this.name}]`,
      style,
      message,
      data || ''
    );

    // Store in localStorage (for debugging)
    this.storeLog(logEntry);

    // Send to server in production (optional)
    if (import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true' && level === 'ERROR') {
      this.sendToServer(logEntry);
    }
  }

  getConsoleStyle(level) {
    const styles = {
      ERROR: 'color: #cb7d3e; font-weight: bold;',
      WARN: 'color: #dbb169; font-weight: bold;',
      INFO: 'color: #9a9a5d; font-weight: normal;',
      DEBUG: 'color: #7a7a4d; font-weight: normal;',
      SUCCESS: 'color: #7ec850; font-weight: bold;',
    };
    return styles[level] || 'color: #9a9a5d;';
  }

  storeLog(logEntry) {
    try {
      const logs = JSON.parse(localStorage.getItem('app_logs') || '[]');
      logs.push(logEntry);
      // Keep only last 100 logs
      if (logs.length > 100) logs.shift();
      localStorage.setItem('app_logs', JSON.stringify(logs));
    } catch (err) {
      console.error('Failed to store log:', err);
    }
  }

  sendToServer(logEntry) {
    try {
      fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logEntry),
      }).catch(() => {
        // Silently fail if server endpoint doesn't exist
      });
    } catch (err) {
      // Silently fail
    }
  }

  error(message, data) {
    this.log('ERROR', message, data);
  }

  warn(message, data) {
    this.log('WARN', message, data);
  }

  info(message, data) {
    this.log('INFO', message, data);
  }

  debug(message, data) {
    if (import.meta.env.MODE === 'development') {
      this.log('DEBUG', message, data);
    }
  }

  success(message, data) {
    this.log('SUCCESS', message, data);
  }

  // Utility to get stored logs
  static getLogs() {
    try {
      return JSON.parse(localStorage.getItem('app_logs') || '[]');
    } catch {
      return [];
    }
  }

  // Utility to clear logs
  static clearLogs() {
    localStorage.removeItem('app_logs');
  }
}

export const createClientLogger = (name) => new ClientLogger(name);
export default ClientLogger;
