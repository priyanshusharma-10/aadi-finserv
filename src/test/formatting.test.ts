import { describe, it, expect } from 'vitest';
import {
  formatINR,
  formatNumber,
  formatPercentage,
  formatFileSize,
  formatPhoneNumber,
  generateApplicationId,
} from '../utils/formatting';

describe('formatINR', () => {
  it('formats standard amounts with Indian separators', () => {
    expect(formatINR(50000)).toContain('50,000');
    expect(formatINR(250000)).toContain('2,50,000');
    expect(formatINR(4000000)).toContain('40,00,000');
  });

  it('includes rupee symbol', () => {
    expect(formatINR(100)).toContain('₹');
  });

  it('handles zero', () => {
    expect(formatINR(0)).toContain('0');
  });
});

describe('formatNumber', () => {
  it('formats with Indian separators', () => {
    expect(formatNumber(250000)).toBe('2,50,000');
    expect(formatNumber(4000000)).toBe('40,00,000');
  });
});

describe('formatPercentage', () => {
  it('appends % sign', () => {
    expect(formatPercentage(10.5)).toBe('10.5%');
  });

  it('respects decimal places', () => {
    expect(formatPercentage(10, 0)).toBe('10.0%');
    expect(formatPercentage(10.55, 2)).toBe('10.55%');
  });
});

describe('formatFileSize', () => {
  it('formats bytes', () => {
    expect(formatFileSize(512)).toContain('B');
  });

  it('formats kilobytes', () => {
    expect(formatFileSize(1024)).toContain('KB');
  });

  it('formats megabytes', () => {
    expect(formatFileSize(5 * 1024 * 1024)).toContain('MB');
  });
});

describe('formatPhoneNumber', () => {
  it('formats 10-digit mobile as +91 format', () => {
    const result = formatPhoneNumber('9876543210');
    expect(result).toContain('+91');
    expect(result).toContain('98765');
    expect(result).toContain('43210');
  });
});

describe('generateApplicationId', () => {
  it('starts with SF prefix', () => {
    expect(generateApplicationId()).toMatch(/^SF/);
  });

  it('generates unique IDs', () => {
    const ids = new Set(Array.from({ length: 20 }, () => generateApplicationId()));
    expect(ids.size).toBeGreaterThan(15);
  });
});
