import { describe, it, expect } from 'vitest';
import {
  validatedFormFields,
  validateEmail,
  validateName,
  validateNIT,
  validatePhone,
  isEmpty,
  validateRequiredFields,
} from '../fieldValidation';

describe('fieldValidation', () => {
  describe('validatedFormFields', () => {
    it('should return no errors for valid data', () => {
      const values = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        phone: '12345678',
        nit: '12345678-9',
      };
      const errors = validatedFormFields(values, ['name', 'email', 'phone', 'nit']);
      expect(Object.keys(errors)).toHaveLength(0);
    });

    it('should return error for empty required field', () => {
      const values = { name: '' };
      const errors = validatedFormFields(values, ['name']);
      expect(errors.name).toBeTruthy();
      expect(errors.name).toContain('requerido');
    });

    it('should validate email format', () => {
      const values = { email: 'invalid-email' };
      const errors = validatedFormFields(values, ['email']);
      expect(errors.email).toBeTruthy();
      expect(errors.email).toContain('inválido');
    });

    it('should validate empty email', () => {
      const values = { email: '' };
      const errors = validatedFormFields(values, ['email']);
      expect(errors.email).toBeTruthy();
      expect(errors.email).toContain('correo electrónico');
    });

    it('should validate name format', () => {
      const values = { name: '123 Invalid' };
      const errors = validatedFormFields(values, ['name']);
      expect(errors.name).toBeTruthy();
      expect(errors.name).toContain('letras y espacios');
    });

    it('should validate NIT format', () => {
      const values = { nit: '12345678' }; // Missing hyphen
      const errors = validatedFormFields(values, ['nit']);
      expect(errors.nit).toBeTruthy();
      expect(errors.nit).toContain('formato');
    });

    it('should validate phone format', () => {
      const values = { phone: '123' }; // Too short
      const errors = validatedFormFields(values, ['phone']);
      expect(errors.phone).toBeTruthy();
      expect(errors.phone).toContain('8 dígitos');
    });

    it('should handle multiple validation errors', () => {
      const values = { name: '', email: 'invalid' };
      const errors = validatedFormFields(values, ['name', 'email']);
      expect(Object.keys(errors).length).toBeGreaterThan(0);
      expect(errors.name).toBeTruthy();
      expect(errors.email).toBeTruthy();
    });

    it('should not validate fields not in the list', () => {
      const values = { name: '', email: 'invalid', phone: '123' };
      const errors = validatedFormFields(values, ['name']);
      expect(errors.name).toBeTruthy();
      expect(errors.email).toBeUndefined();
      expect(errors.phone).toBeUndefined();
    });

    it('should handle special characters in names', () => {
      const values = { name: 'María José Ñoño' };
      const errors = validatedFormFields(values, ['name']);
      expect(errors.name).toBeUndefined();
    });

    it('should accept valid NIT format', () => {
      const values = { nit: '87654321-0' };
      const errors = validatedFormFields(values, ['nit']);
      expect(errors.nit).toBeUndefined();
    });

    it('should accept valid phone', () => {
      const values = { phone: '55512345' };
      const errors = validatedFormFields(values, ['phone']);
      expect(errors.phone).toBeUndefined();
    });
  });

  describe('validateEmail', () => {
    it('should return true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@example.com')).toBe(true);
      expect(validateEmail('user+tag@example.co.uk')).toBe(true);
    });

    it('should return false for invalid email', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('invalid@')).toBe(false);
      expect(validateEmail('@invalid.com')).toBe(false);
      expect(validateEmail('invalid.com')).toBe(false);
      expect(validateEmail('invalid @example.com')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validateName', () => {
    it('should return true for valid name', () => {
      expect(validateName('Juan Pérez')).toBe(true);
      expect(validateName('María José')).toBe(true);
      expect(validateName('José Ñoño')).toBe(true);
    });

    it('should return false for name with numbers', () => {
      expect(validateName('Juan123')).toBe(false);
    });

    it('should return false for name with special characters', () => {
      expect(validateName('Juan@Perez')).toBe(false);
      expect(validateName('Juan_Perez')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(validateName('')).toBe(false);
    });

    it('should return false for names longer than 40 characters', () => {
      const longName = 'A'.repeat(41);
      expect(validateName(longName)).toBe(false);
    });

    it('should allow accented characters', () => {
      expect(validateName('Ángel García')).toBe(true);
      expect(validateName('Iñaki Úbeda')).toBe(true);
    });
  });

  describe('validateNIT', () => {
    it('should return true for valid NIT', () => {
      expect(validateNIT('12345678-9')).toBe(true);
      expect(validateNIT('1234567-8')).toBe(true);
      expect(validateNIT('123456-7')).toBe(true);
    });

    it('should return false for NIT without hyphen', () => {
      expect(validateNIT('123456789')).toBe(false);
    });

    it('should return false for NIT with wrong format', () => {
      expect(validateNIT('12-3456789')).toBe(false);
      expect(validateNIT('12345678-90')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(validateNIT('')).toBe(false);
    });

    it('should return false for NIT with letters', () => {
      expect(validateNIT('1234567A-9')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('should return true for valid 8-digit phone', () => {
      expect(validatePhone('12345678')).toBe(true);
      expect(validatePhone('55512345')).toBe(true);
      expect(validatePhone('77778888')).toBe(true);
    });

    it('should return false for phone with less than 8 digits', () => {
      expect(validatePhone('1234567')).toBe(false);
      expect(validatePhone('123')).toBe(false);
    });

    it('should return false for phone with more than 8 digits', () => {
      expect(validatePhone('123456789')).toBe(false);
    });

    it('should return false for phone with letters', () => {
      expect(validatePhone('1234567a')).toBe(false);
    });

    it('should return false for phone with special characters', () => {
      expect(validatePhone('1234-5678')).toBe(false);
      expect(validatePhone('1234 5678')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(validatePhone('')).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true for empty string', () => {
      expect(isEmpty('')).toBe(true);
    });

    it('should return true for whitespace string', () => {
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty('\t')).toBe(true);
      expect(isEmpty('\n')).toBe(true);
    });

    it('should return true for undefined', () => {
      expect(isEmpty(undefined)).toBe(true);
    });

    it('should return true for null', () => {
      expect(isEmpty(null)).toBe(true);
    });

    it('should return false for non-empty string', () => {
      expect(isEmpty('text')).toBe(false);
      expect(isEmpty(' text ')).toBe(false);
    });
  });

  describe('validateRequiredFields', () => {
    it('should return no errors for all filled required fields', () => {
      const values = {
        name: 'John',
        email: 'john@example.com',
        phone: '12345678',
      };
      const errors = validateRequiredFields(values, ['name', 'email', 'phone']);
      expect(Object.keys(errors)).toHaveLength(0);
    });

    it('should return errors for empty required fields', () => {
      const values = {
        name: '',
        email: '',
      };
      const errors = validateRequiredFields(values, ['name', 'email']);
      expect(errors.name).toBeTruthy();
      expect(errors.email).toBeTruthy();
    });

    it('should return errors for undefined required fields', () => {
      const values = {};
      const errors = validateRequiredFields(values, ['name', 'email']);
      expect(errors.name).toBeTruthy();
      expect(errors.email).toBeTruthy();
    });

    it('should return errors for null required fields', () => {
      const values = {
        name: null,
        email: null,
      };
      const errors = validateRequiredFields(values, ['name', 'email']);
      expect(errors.name).toBeTruthy();
      expect(errors.email).toBeTruthy();
    });

    it('should return errors for whitespace-only fields', () => {
      const values = {
        name: '   ',
        email: '\t',
      };
      const errors = validateRequiredFields(values, ['name', 'email']);
      expect(errors.name).toBeTruthy();
      expect(errors.email).toBeTruthy();
    });

    it('should not return errors for non-required fields', () => {
      const values = {
        name: 'John',
        email: '',
      };
      const errors = validateRequiredFields(values, ['name']);
      expect(errors.name).toBeUndefined();
      expect(errors.email).toBeUndefined();
    });

    it('should handle numeric values', () => {
      const values = {
        age: 0,
        count: 5,
      };
      const errors = validateRequiredFields(values, ['age', 'count']);
      expect(Object.keys(errors)).toHaveLength(0);
    });
  });
});

