import { describe, it, expect } from 'vitest';
import { calculateEMI, getAmortisationSchedule } from '../utils/emiCalculator';

describe('calculateEMI', () => {
  it('calculates EMI correctly for standard loan', () => {
    // ₹5,00,000 at 10.5% for 24 months
    const result = calculateEMI(500000, 10.5, 24);
    expect(result.emi).toBeGreaterThan(0);
    // Standard formula: should be around ₹23,226
    expect(result.emi).toBeCloseTo(23226, -2);
  });

  it('calculates total payment correctly', () => {
    const result = calculateEMI(500000, 10.5, 24);
    expect(result.totalPayment).toBeCloseTo(result.emi * 24, -2);
  });

  it('total interest = total payment - principal', () => {
    const result = calculateEMI(500000, 10.5, 24);
    expect(result.totalInterest).toBeCloseTo(result.totalPayment - 500000, -2);
  });

  it('principal + interest percents sum to 100', () => {
    const result = calculateEMI(500000, 10.5, 24);
    expect(result.principalPercent + result.interestPercent).toBeCloseTo(100, 0);
  });

  it('handles zero interest rate', () => {
    const result = calculateEMI(500000, 0, 24);
    expect(result.emi).toBeCloseTo(500000 / 24, 0);
    expect(result.totalInterest).toBe(0);
    expect(result.principalPercent).toBe(100);
  });

  it('handles minimum loan amount', () => {
    const result = calculateEMI(50000, 10.5, 6);
    expect(result.emi).toBeGreaterThan(0);
    expect(result.totalPayment).toBeGreaterThan(50000);
  });

  it('handles maximum loan amount', () => {
    const result = calculateEMI(4000000, 10.5, 60);
    expect(result.emi).toBeGreaterThan(0);
    expect(result.totalPayment).toBeGreaterThan(4000000);
  });

  it('handles minimum tenure', () => {
    const result = calculateEMI(500000, 10.5, 6);
    expect(result.emi).toBeGreaterThan(0);
  });

  it('handles maximum tenure', () => {
    const result = calculateEMI(500000, 10.5, 60);
    expect(result.emi).toBeLessThan(calculateEMI(500000, 10.5, 6).emi);
  });

  it('returns zeroes for zero principal', () => {
    const result = calculateEMI(0, 10.5, 24);
    expect(result.emi).toBe(0);
    expect(result.totalPayment).toBe(0);
  });

  it('returns zeroes for zero months', () => {
    const result = calculateEMI(500000, 10.5, 0);
    expect(result.emi).toBe(0);
  });

  it('longer tenure means lower EMI', () => {
    const short = calculateEMI(500000, 10.5, 12);
    const long = calculateEMI(500000, 10.5, 60);
    expect(long.emi).toBeLessThan(short.emi);
  });

  it('longer tenure means more total interest', () => {
    const short = calculateEMI(500000, 10.5, 12);
    const long = calculateEMI(500000, 10.5, 60);
    expect(long.totalInterest).toBeGreaterThan(short.totalInterest);
  });

  it('higher rate means higher EMI', () => {
    const low = calculateEMI(500000, 10.5, 24);
    const high = calculateEMI(500000, 18, 24);
    expect(high.emi).toBeGreaterThan(low.emi);
  });
});

describe('getAmortisationSchedule', () => {
  it('returns correct number of entries', () => {
    const schedule = getAmortisationSchedule(500000, 10.5, 24);
    expect(schedule).toHaveLength(24);
  });

  it('final balance is 0', () => {
    const schedule = getAmortisationSchedule(500000, 10.5, 24);
    expect(schedule[schedule.length - 1].balance).toBe(0);
  });

  it('each entry has required fields', () => {
    const schedule = getAmortisationSchedule(500000, 10.5, 24);
    schedule.forEach((entry) => {
      expect(entry).toHaveProperty('month');
      expect(entry).toHaveProperty('emi');
      expect(entry).toHaveProperty('principal');
      expect(entry).toHaveProperty('interest');
      expect(entry).toHaveProperty('balance');
    });
  });
});
