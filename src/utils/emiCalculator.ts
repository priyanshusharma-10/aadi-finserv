import type { EmiResult } from '../types/loan';

/**
 * Calculates EMI using the standard reducing-balance formula:
 * EMI = P × r × (1+r)^n / ((1+r)^n − 1)
 *
 * @param principal - Loan amount in INR
 * @param annualRate - Annual interest rate as a percentage (e.g. 10.5 for 10.5%)
 * @param months - Loan tenure in months
 */
export function calculateEMI(principal: number, annualRate: number, months: number): EmiResult {
  if (principal <= 0 || months <= 0) {
    return {
      emi: 0,
      totalPayment: 0,
      totalInterest: 0,
      principalPercent: 100,
      interestPercent: 0,
    };
  }

  // Zero-interest edge case
  if (annualRate === 0) {
    const emi = principal / months;
    return {
      emi,
      totalPayment: principal,
      totalInterest: 0,
      principalPercent: 100,
      interestPercent: 0,
    };
  }

  const monthlyRate = annualRate / (12 * 100);
  const factor = Math.pow(1 + monthlyRate, months);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;
  const principalPercent = (principal / totalPayment) * 100;
  const interestPercent = (totalInterest / totalPayment) * 100;

  return {
    emi: Math.round(emi),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    principalPercent: Math.round(principalPercent * 10) / 10,
    interestPercent: Math.round(interestPercent * 10) / 10,
  };
}

/**
 * Returns an amortisation schedule (monthly breakdown)
 */
export function getAmortisationSchedule(
  principal: number,
  annualRate: number,
  months: number
): Array<{ month: number; emi: number; principal: number; interest: number; balance: number }> {
  const monthlyRate = annualRate / (12 * 100);
  const emiResult = calculateEMI(principal, annualRate, months);
  const emi = emiResult.emi;

  const schedule = [];
  let balance = principal;

  for (let month = 1; month <= months; month++) {
    const interest = Math.round(balance * monthlyRate);
    const principalPart = Math.min(emi - interest, balance);
    balance = Math.round(balance - principalPart);

    schedule.push({
      month,
      emi,
      principal: principalPart,
      interest,
      balance: Math.max(0, balance),
    });
  }

  return schedule;
}
