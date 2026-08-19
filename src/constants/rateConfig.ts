import type { RateDetail } from '../types/loan';

export const rateDetails: RateDetail[] = [
  {
    id: 'personal-loan',
    label: 'Personal Loan',
    value: '10.5% – 22% p.a.',
    note: 'Unsecured. Fast approval for salaried & self-employed.',
  },
  {
    id: 'business-loan',
    label: 'Business / SME Loan',
    value: '11% – 24% p.a.',
    note: 'Working capital, expansion, and overdraft facilities.',
  },
  {
    id: 'home-loan',
    label: 'Home Loan',
    value: '8.5% – 12% p.a.',
    note: 'Flexible tenure up to 30 years. Competitive rates from top banks.',
  },
  {
    id: 'lap',
    label: 'Loan Against Property',
    value: '9% – 14% p.a.',
    note: 'Residential or commercial property. High loan-to-value ratio.',
  },
  {
    id: 'professional',
    label: 'Professional / Doctors Loan',
    value: '10% – 18% p.a.',
    note: 'Tailored for doctors, CAs, architects, and qualified professionals.',
  },
  {
    id: 'processing-fee',
    label: 'Processing Fee',
    value: 'Up to 2.5%',
    note: 'One-time fee. Maximum ₹15,000. Fully disclosed upfront.',
  },
];

export const feeSchedule = [
  { label: 'Personal Loan — Min Amount', value: '₹50,000' },
  { label: 'Personal Loan — Max Amount', value: '₹40,00,000' },
  { label: 'Home Loan — Max Tenure', value: '30 years' },
  { label: 'LAP — Loan-to-Value', value: 'Up to 75% of property value' },
  { label: 'Unsecured Business Loan', value: 'Up to ₹50,00,000' },
  { label: 'Prepayment Charges', value: 'Up to 4% (after 6 EMIs)' },
  { label: 'Cheque / ECS Bounce', value: '₹500 per instance + taxes' },
  { label: 'Late Payment Fee', value: '₹500 + 2% p.m. on overdue amount' },
  { label: 'NOC Certificate', value: 'Free (digital) / ₹100 (physical)' },
  { label: 'Foreclosure Certificate', value: '₹250 + applicable taxes' },
];
