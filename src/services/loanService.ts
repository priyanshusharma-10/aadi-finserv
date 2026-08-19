/**
 * Loan service — the single point of contact between UI and backend
 *
 * Currently delegates to the mock service.
 * To connect a real backend:
 *   1. Import apiClient from './api'
 *   2. Replace mock calls with apiClient.post / .get
 *   3. Map response shapes as needed
 */

import { mockLoanService } from './mockLoanService';
import type { ApplicationFormData } from '../types/application';

export const loanService = {
  checkEligibility: (income: number, age: number) =>
    mockLoanService.checkEligibility(income, age),

  calculateLoanOffer: (principal: number, tenure: number) =>
    mockLoanService.calculateLoanOffer(principal, tenure),

  submitApplication: (data: ApplicationFormData) =>
    mockLoanService.submitApplication(data),

  getApplicationStatus: (applicationId: string, mobile: string) =>
    mockLoanService.getApplicationStatus(applicationId, mobile),

  contactAdvisor: (data: {
    name: string;
    mobile: string;
    email: string;
    preferredTime: string;
    message: string;
  }) => mockLoanService.contactAdvisor(data),

  getLoanRates: () => mockLoanService.getLoanRates(),
};

export const applicationService = {
  submit: (data: ApplicationFormData) => loanService.submitApplication(data),
};

export const documentService = {
  upload: (file: File, documentType: string) =>
    mockLoanService.uploadDocument(file, documentType),
};
