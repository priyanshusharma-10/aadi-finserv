/**
 * Loan configuration
 * Centralised loan business rules — flexible bounds for Personal, Business & Home Loans
 */

export const loanConfig = {
  minAmount: 50_000,
  maxAmount: 1_00_00_000, // 1 Crore (supports Home Loans & LAP)
  amountStep: 25_000,

  minTenureMonths: 6,
  maxTenureMonths: 360, // 30 Years
  tenureStepMonths: 6,

  minTenureYears: 1,
  maxTenureYears: 30,
  tenureStepYears: 1,

  defaultRate: 10.5,
  minRate: 5.0,
  maxRate: 30.0,
  rateStep: 0.1,

  minIncome: 20_000,
  minCreditScore: 685,
  minAge: 21,
  maxAge: 65,

  processingFeePercent: 2.5,
  maxProcessingFee: 15_000,

  defaultLoanAmount: 5_00_000,
  defaultTenure: 24, // 2 years / 24 months

  allowedFileTypes: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
  allowedFileExtensions: ['.pdf', '.jpg', '.jpeg', '.png'],
  maxFileSizeMb: 5,
} as const;
