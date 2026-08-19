/**
 * Mock service layer — simulates backend responses with realistic delays.
 *
 * TO INTEGRATE REAL API:
 * 1. Remove the mock delay / simulated logic below
 * 2. Import apiClient from './api'
 * 3. Call apiClient.post / .get with your real endpoints
 * 4. Map the API response shape to the types defined in src/types/
 */

import type { ApplicationFormData, ApplicationStatusInfo } from '../types/application';
import { generateApplicationId } from '../utils/formatting';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function maybeThrow(message = 'Something went wrong. Please try again.') {
  if (Math.random() < 0.05) throw new Error(message);
}

export interface EligibilityResult {
  eligible: boolean;
  maxLoanAmount: number;
  offeredRate: number;
  reason?: string;
}

export interface LoanOffer {
  offerId: string;
  amount: number;
  rate: number;
  tenure: number;
  emi: number;
  processingFee: number;
  validUntil: string;
}

export const mockLoanService = {
  async checkEligibility(income: number, age: number): Promise<EligibilityResult> {
    await delay(1200);
    maybeThrow();
    if (income < 20000) {
      return { eligible: false, maxLoanAmount: 0, offeredRate: 0, reason: 'Income below minimum requirement.' };
    }
    if (age < 21 || age > 58) {
      return { eligible: false, maxLoanAmount: 0, offeredRate: 0, reason: 'Age not within eligible range.' };
    }
    const maxAmount = Math.min(income * 24, 4_000_000);
    const rate = income > 100_000 ? 10.5 : income > 50_000 ? 13.5 : 18.0;
    return { eligible: true, maxLoanAmount: maxAmount, offeredRate: rate };
  },

  async calculateLoanOffer(principal: number, tenure: number): Promise<LoanOffer> {
    await delay(800);
    const rate = 10.5;
    const monthlyRate = rate / (12 * 100);
    const factor = Math.pow(1 + monthlyRate, tenure);
    const emi = Math.round((principal * monthlyRate * factor) / (factor - 1));
    const processingFee = Math.min(Math.round(principal * 0.025), 15000);
    const validDate = new Date();
    validDate.setDate(validDate.getDate() + 7);
    return {
      offerId: `OFF${Date.now()}`,
      amount: principal,
      rate,
      tenure,
      emi,
      processingFee,
      validUntil: validDate.toISOString(),
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async submitApplication(_data: ApplicationFormData): Promise<{ applicationId: string }> {
    await delay(2500);
    maybeThrow('Submission failed. Please check your details and try again.');
    return { applicationId: generateApplicationId() };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async uploadDocument(file: File, _documentType: string): Promise<{ documentId: string }> {
    await delay(1500 + Math.random() * 1000);
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size exceeds 5MB limit.');
    }
    return { documentId: `DOC${Date.now()}` };
  },

  async getApplicationStatus(
    applicationId: string,
    _mobile: string
  ): Promise<ApplicationStatusInfo> {
    await delay(1000);
    if (!applicationId.startsWith('SF')) {
      throw new Error('Application not found. Please check your Application ID.');
    }
    const statuses: ApplicationStatusInfo['status'][] = [
      'submitted',
      'verification',
      'document_verification',
      'credit_assessment',
      'approved',
    ];
    const statusIndex = applicationId.charCodeAt(2) % statuses.length;
    return {
      applicationId,
      status: statuses[statusIndex],
      submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 3600000).toISOString(),
      applicantName: 'Demo Applicant',
      loanAmount: 500000,
      currentStep: statusIndex + 1,
      totalSteps: 5,
      nextAction: statusIndex < 3 ? 'Document review in progress' : undefined,
      estimatedDate:
        statusIndex >= 3
          ? new Date(Date.now() + 86400000).toLocaleDateString('en-IN')
          : undefined,
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async contactAdvisor(_data: {
    name: string;
    mobile: string;
    email: string;
    preferredTime: string;
    message: string;
  }): Promise<{ ticketId: string }> {
    await delay(1200);
    maybeThrow();
    return { ticketId: `TKT${Date.now()}` };
  },

  async getLoanRates() {
    await delay(300);
    return { minRate: 10.5, maxRate: 24.0, processingFee: 2.5, prepaymentCharge: 4.0 };
  },
};
