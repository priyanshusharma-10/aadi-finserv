export interface EmiResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  principalPercent: number;
  interestPercent: number;
}

export interface LoanRate {
  id: string;
  label: string;
  value: string;
  description?: string;
}

export interface RateDetail {
  id: string;
  label: string;
  value: string;
  note?: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon?: string;
}

export interface EligibilityCriteria {
  id: string;
  label: string;
  value: string;
  icon: string;
  description?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  required: boolean;
  icon?: string;
}

export interface DocumentCategory {
  id: string;
  title: string;
  description: string;
  documents: DocumentItem[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export type EmploymentType = 'salaried' | 'self-employed' | 'business-owner' | 'professional';

export type LoanPurpose =
  | 'medical'
  | 'education'
  | 'home-renovation'
  | 'wedding'
  | 'travel'
  | 'debt-consolidation'
  | 'personal'
  | 'other';
