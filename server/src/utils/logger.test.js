// Example: Logger Tests
import { describe, it, expect, beforeEach } from 'vitest';
import { createLogger } from '../utils/logger';

describe('Logger', () => {
  let logger;

  beforeEach(() => {
    logger = createLogger('TEST');
  });

  it('should create logger instance', () => {
    expect(logger).toBeDefined();
    expect(logger.name).toBe('TEST');
  });

  it('should format timestamp correctly', () => {
    const timestamp = logger.getTimestamp();
    expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('should format error message', () => {
    const message = logger.formatMessage('ERROR', 'Test error');
    expect(message.level).toBe('ERROR');
    expect(message.message).toBe('Test error');
    expect(message.name).toBe('TEST');
  });

  it('should include data in formatted message', () => {
    const data = { userId: 1, action: 'login' };
    const message = logger.formatMessage('INFO', 'User action', data);
    expect(message.data).toEqual(data);
  });
});
