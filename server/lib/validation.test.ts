import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePhone,
  validateString,
  validateBookingForm,
  validateContactForm,
  sanitizeString,
  sanitizeObject,
} from './validation';

describe('Validation Functions', () => {
  describe('validateEmail', () => {
    it('should validate correct emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user+tag@domain.co.uk')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('should validate French phone numbers', () => {
      expect(validatePhone('06 17 21 22 30')).toBe(true);
      expect(validatePhone('0617212230')).toBe(true);
      expect(validatePhone('+33617212230')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(validatePhone('123')).toBe(false);
      expect(validatePhone('invalid')).toBe(false);
    });
  });

  describe('validateString', () => {
    it('should validate strings within length limits', () => {
      expect(validateString('hello', 1, 10)).toBe(true);
      expect(validateString('test', 2, 10)).toBe(true);
    });

    it('should reject strings outside length limits', () => {
      expect(validateString('', 1, 10)).toBe(false);
      expect(validateString('toolongstring', 1, 5)).toBe(false);
    });
  });

  describe('validateBookingForm', () => {
    it('should validate correct booking form', () => {
      const form = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '0617212230',
        service: 'automobile',
        address: '123 Rue de la Paix, Paris',
      };
      const errors = validateBookingForm(form);
      expect(errors).toHaveLength(0);
    });

    it('should reject invalid booking form', () => {
      const form = {
        name: 'J',
        email: 'invalid',
        phone: '123',
        service: '',
        address: 'short',
      };
      const errors = validateBookingForm(form);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('validateContactForm', () => {
    it('should validate correct contact form', () => {
      const form = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '0617212230',
        message: 'This is a test message for contact form',
      };
      const errors = validateContactForm(form);
      expect(errors).toHaveLength(0);
    });

    it('should reject invalid contact form', () => {
      const form = {
        name: 'J',
        email: 'invalid',
        message: 'short',
      };
      const errors = validateContactForm(form);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('sanitizeString', () => {
    it('should remove HTML tags', () => {
      const result1 = sanitizeString('<script>alert("xss")</script>');
      expect(result1).not.toContain('<');
      expect(result1).not.toContain('>');
      const result2 = sanitizeString('Hello <b>World</b>');
      expect(result2).not.toContain('<');
      expect(result2).not.toContain('>');
    });

    it('should remove javascript: URLs', () => {
      expect(sanitizeString('javascript:alert("xss")')).toBe('alert("xss")');
    });

    it('should trim whitespace', () => {
      expect(sanitizeString('  hello  ')).toBe('hello');
    });
  });

  describe('sanitizeObject', () => {
    it('should sanitize object properties', () => {
      const obj = {
        name: '<script>alert("xss")</script>',
        email: 'test@example.com',
      };
      const sanitized = sanitizeObject(obj);
      expect(sanitized.name).not.toContain('<script>');
      expect(sanitized.email).toBe('test@example.com');
    });

    it('should sanitize nested objects', () => {
      const obj = {
        user: {
          name: '<b>John</b>',
          email: 'john@example.com',
        },
      };
      const sanitized = sanitizeObject(obj);
      expect(sanitized.user.name).not.toContain('<b>');
    });

    it('should sanitize arrays', () => {
      const arr = ['<script>xss</script>', 'normal text'];
      const sanitized = sanitizeObject(arr);
      expect(sanitized[0]).not.toContain('<script>');
      expect(sanitized[1]).toBe('normal text');
    });
  });
});
