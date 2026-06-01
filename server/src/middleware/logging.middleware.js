// Error Handler Middleware
import { createLogger } from '../utils/logger.js';

const logger = createLogger('ERROR_HANDLER');

export const errorHandler = (err, req, res, next) => {
  // Ensure err is an Error object
  const error = err instanceof Error ? err : new Error(String(err));

  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Log error with details
  logger.error('Request Error', {
    status,
    message,
    path: req.path,
    method: req.method,
    ip: req.ip,
    stack: error.stack,
  });

  // Send error response
  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

export const notFoundHandler = (req, res) => {
  logger.warn('Route Not Found', {
    path: req.path,
    method: req.method,
  });

  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
  });
};

// Request logging middleware
export const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  // Capture response details
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logData = {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    };

    if (res.statusCode >= 400) {
      logger.warn(`${req.method} ${req.path}`, logData);
    } else {
      logger.info(`${req.method} ${req.path}`, logData);
    }
  });

  next();
};

// Async error wrapper
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default {
  errorHandler,
  notFoundHandler,
  requestLogger,
  asyncHandler,
};
