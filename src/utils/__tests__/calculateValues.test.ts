import { describe, it, expect } from 'vitest';
import { calculateTotal, formatNumber, safeParseNumber } from '../calculateValues';

describe('calculateValues', () => {
  describe('calculateTotal', () => {
    it('should calculate total correctly with numbers', () => {
      const result = calculateTotal({
        exento: 100,
        importation: 200,
        service: 300,
        asset: 400,
      });
      // 400 + 200 + 300 - 100 = 800
      expect(result).toBe(800);
    });

    it('should calculate total correctly with strings', () => {
      const result = calculateTotal({
        exento: '100',
        importation: '200',
        service: '300',
        asset: '400',
      });
      expect(result).toBe(800);
    });

    it('should handle empty strings as 0', () => {
      const result = calculateTotal({
        exento: '',
        importation: '',
        service: '',
        asset: '100',
      });
      expect(result).toBe(100);
    });

    it('should handle negative values', () => {
      const result = calculateTotal({
        exento: -50,
        importation: 100,
        service: 100,
        asset: 100,
      });
      // 100 + 100 + 100 - (-50) = 350
      expect(result).toBe(350);
    });

    it('should handle decimal values', () => {
      const result = calculateTotal({
        exento: 10.5,
        importation: 20.25,
        service: 30.75,
        asset: 40.5,
      });
      // 40.5 + 20.25 + 30.75 - 10.5 = 81
      expect(result).toBe(81);
    });

    it('should handle all zeros', () => {
      const result = calculateTotal({
        exento: 0,
        importation: 0,
        service: 0,
        asset: 0,
      });
      expect(result).toBe(0);
    });

    it('should handle large numbers', () => {
      const result = calculateTotal({
        exento: 1000000,
        importation: 2000000,
        service: 3000000,
        asset: 4000000,
      });
      // 4000000 + 2000000 + 3000000 - 1000000 = 8000000
      expect(result).toBe(8000000);
    });

    it('should handle mixed string and number inputs', () => {
      const result = calculateTotal({
        exento: '50',
        importation: 100,
        service: '150',
        asset: 200,
      });
      // 200 + 100 + 150 - 50 = 400
      expect(result).toBe(400);
    });

    it('should handle invalid string inputs as 0', () => {
      const result = calculateTotal({
        exento: 'abc',
        importation: 'xyz',
        service: 100,
        asset: 200,
      });
      // 200 + 0 + 100 - 0 = 300
      expect(result).toBe(300);
    });
  });

  describe('formatNumber', () => {
    it('should format number with 2 decimals by default', () => {
      expect(formatNumber(123.456)).toBe('123.46');
    });

    it('should format number with specified decimals', () => {
      expect(formatNumber(123.456, 1)).toBe('123.5');
      expect(formatNumber(123.456, 3)).toBe('123.456');
    });

    it('should format integer with decimals', () => {
      expect(formatNumber(100)).toBe('100.00');
      expect(formatNumber(100, 3)).toBe('100.000');
    });

    it('should round up correctly', () => {
      expect(formatNumber(123.999, 2)).toBe('124.00');
    });

    it('should round down correctly', () => {
      expect(formatNumber(123.444, 2)).toBe('123.44');
    });

    it('should handle negative numbers', () => {
      expect(formatNumber(-123.456)).toBe('-123.46');
    });

    it('should handle zero', () => {
      expect(formatNumber(0)).toBe('0.00');
    });
  });

  describe('safeParseNumber', () => {
    it('should parse valid number string', () => {
      expect(safeParseNumber('123')).toBe(123);
      expect(safeParseNumber('123.45')).toBe(123.45);
    });

    it('should parse actual number', () => {
      expect(safeParseNumber(456)).toBe(456);
      expect(safeParseNumber(456.78)).toBe(456.78);
    });

    it('should return default value for undefined', () => {
      expect(safeParseNumber(undefined)).toBe(0);
      expect(safeParseNumber(undefined, 10)).toBe(10);
    });

    it('should return default value for empty string', () => {
      expect(safeParseNumber('')).toBe(0);
      expect(safeParseNumber('', 5)).toBe(5);
    });

    it('should return default value for null', () => {
      expect(safeParseNumber(null as any)).toBe(0);
      expect(safeParseNumber(null as any, 15)).toBe(15);
    });

    it('should return default value for invalid string', () => {
      expect(safeParseNumber('abc')).toBe(0);
      expect(safeParseNumber('xyz', 20)).toBe(20);
    });

    it('should handle negative numbers', () => {
      expect(safeParseNumber('-123')).toBe(-123);
      expect(safeParseNumber(-456)).toBe(-456);
    });

    it('should handle zero', () => {
      expect(safeParseNumber('0')).toBe(0);
      expect(safeParseNumber(0)).toBe(0);
    });
  });
});

