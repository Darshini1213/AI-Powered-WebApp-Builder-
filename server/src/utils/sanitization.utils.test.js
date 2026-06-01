// Example: Validation Utils Tests
import { describe, it, expect } from 'vitest';
import { sanitizeInput, sanitizeEmail, sanitizeUrl } from '../utils/sanitization.utils';

describe('Sanitization Utils', () => {
  describe('sanitizeInput', () => {
    it('should remove XSS attacks', () => {
      const malicious = '<script>alert("xss")</script>Hello';
      const result = sanitizeInput(malicious);
      expect(result).not.toContain('<script>');
    });

    it('should trim whitespace', () => {
      const input = '  hello world  ';
      const result = sanitizeInput(input);
      expect(result).toBe('hello world');
    });

    it('should handle non-string inputs', () => {
      expect(sanitizeInput(null)).toBe(null);
      expect(sanitizeInput(undefined)).toBe(undefined);
      expect(sanitizeInput(123)).toBe(123);
    });
  });

  describe('sanitizeEmail', () => {
    it('should validate correct emails', () => {
      const email = 'test@example.com';
      const result = sanitizeEmail(email);
      expect(result).toBe('test@example.com');
    });

    it('should reject invalid emails', () => {
      const email = 'invalid-email';
      const result = sanitizeEmail(email);
      expect(result).toBe('');
    });

    it('should normalize email to lowercase', () => {
      const email = 'Test@EXAMPLE.COM';
      const result = sanitizeEmail(email);
      expect(result).toBe('test@example.com');
    });
  });

  describe('sanitizeUrl', () => {
    it('should accept valid URLs', () => {
      const url = 'https://example.com';
      const result = sanitizeUrl(url);
      expect(result).toBe('https://example.com');
    });

    it('should reject invalid URLs', () => {
      const url = 'not a url';
      const result = sanitizeUrl(url);
      expect(result).toBe('');
    });
  });
});
