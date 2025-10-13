import { describe, it, expect } from 'vitest';

import { currencyFormatter, parseCurrency, formatQuetzal } from '../currencyFormatter';

describe('currencyFormatter', () => {
  describe('currencyFormatter', () => {
    it('should format number as GTQ currency by default', () => {
      const result = currencyFormatter(1000);
      expect(result).toContain('1,000');
      expect(result).toContain('Q'); // GTQ symbol
    });

    it('should format string numbers', () => {
      const result = currencyFormatter('1500.50');
      expect(result).toContain('1,500.50');
    });

    it('should handle different regions and currencies', () => {
      const result = currencyFormatter(1000, { region: 'en-US', currency: 'USD' });
      expect(result).toContain('$');
      expect(result).toContain('1,000');
    });

    it('should handle invalid numbers', () => {
      const result = currencyFormatter('invalid');
      expect(result).toContain('0');
    });

    it('should handle zero', () => {
      const result = currencyFormatter(0);
      expect(result).toContain('0');
    });

    it('should format negative numbers', () => {
      const result = currencyFormatter(-500);
      expect(result).toContain('500');
      expect(result).toMatch(/-|−/); // Negative sign
    });

    it('should format decimal numbers', () => {
      const result = currencyFormatter(123.45);
      expect(result).toContain('123.45');
    });

    it('should round to 2 decimal places', () => {
      const result = currencyFormatter(123.456);
      expect(result).toContain('123.46');
    });

    it('should format large numbers', () => {
      const result = currencyFormatter(1000000);
      expect(result).toContain('1,000,000');
    });

    it('should handle very small decimal numbers', () => {
      const result = currencyFormatter(0.01);
      expect(result).toContain('0.01');
    });

    it('should format with custom region MXN', () => {
      const result = currencyFormatter(500, { region: 'es-MX', currency: 'MXN' });
      expect(result).toContain('500');
      expect(result).toContain('$');
    });

    it('should format with EUR currency', () => {
      const result = currencyFormatter(1000, { region: 'de-DE', currency: 'EUR' });
      expect(result).toContain('1');
      expect(result).toContain('€');
    });
  });

  describe('parseCurrency', () => {
    it('should parse GTQ currency string', () => {
      expect(parseCurrency('Q1,000.00')).toBe(1000);
    });

    it('should parse USD currency string', () => {
      expect(parseCurrency('$500.50')).toBe(500.5);
    });

    it('should parse currency without symbol', () => {
      expect(parseCurrency('1,234.56')).toBe(1234.56);
    });

    it('should handle numbers without thousands separator', () => {
      expect(parseCurrency('999.99')).toBe(999.99);
    });

    it('should handle numbers without decimals', () => {
      expect(parseCurrency('1,000')).toBe(1000);
    });

    it('should handle negative currency', () => {
      expect(parseCurrency('-Q500.00')).toBe(-500);
    });

    it('should return 0 for invalid strings', () => {
      expect(parseCurrency('invalid')).toBe(0);
      expect(parseCurrency('abc')).toBe(0);
    });

    it('should return 0 for empty string', () => {
      expect(parseCurrency('')).toBe(0);
    });

    it('should handle spaces in currency string', () => {
      expect(parseCurrency('Q 1,500.00')).toBe(1500);
    });

    it('should parse large numbers', () => {
      expect(parseCurrency('Q1,000,000.00')).toBe(1000000);
    });
  });

  describe('formatQuetzal', () => {
    it('should format number as Quetzal', () => {
      const result = formatQuetzal(1000);
      expect(result).toContain('Q');
      expect(result).toContain('1,000');
    });

    it('should format string as Quetzal', () => {
      const result = formatQuetzal('500');
      expect(result).toContain('Q');
      expect(result).toContain('500');
    });

    it('should handle decimals', () => {
      const result = formatQuetzal(123.45);
      expect(result).toContain('123.45');
    });

    it('should be equivalent to currencyFormatter with GTQ', () => {
      const value = 1500.75;
      const result1 = formatQuetzal(value);
      const result2 = currencyFormatter(value, { region: 'es-GT', currency: 'GTQ' });
      expect(result1).toBe(result2);
    });
  });
});

