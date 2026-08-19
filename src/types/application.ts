import type { EmploymentType, LoanPurpose } from './loan';

export type ApplicationStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface PersonalDetails {
  fullName: string;
  dateOfBirth: string;
  mobile: string;
  email: string;
  pan: string;
  aadhaar: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface EmploymentDetails {
  employmentType: EmploymentType | '';
  employerName: string;
  monthlyIncome: string;
  workExperience: string;
  existingEmi: string;
  bankAccountType: string;
}

export interface LoanDetails {
  loanAmount: string;
  tenure: string;
  loanPurpose: LoanPurpose | '';
}

export interface UploadedFile {
  id: string;
  documentType: string;
  file: File;
  name: string;
  size: number;
  uploadProgress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  errorMessage?: string;
  preview?: string;
}

export interface DocumentUpload {
  files: Record<string, UploadedFile | null>;
}

export interface ApplicationFormData {
  personalDetails: PersonalDetails;
  employmentDetails: EmploymentDetails;
  loanDetails: LoanDetails;
  documentUpload: DocumentUpload;
}

export type ApplicationStatus =
  | 'submitted'
  | 'verification'
  | 'document_verification'
  | 'credit_assessment'
  | 'approved'
  | 'disbursed'
  | 'rejected';

export interface ApplicationStatusInfo {
  applicationId: string;
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
  applicantName: string;
  loanAmount: number;
  currentStep: number;
  totalSteps: number;
  nextAction?: string;
  estimatedDate?: string;
}

export interface AdvisorContactForm {
  name: string;
  mobile: string;
  email: string;
  preferredTime: string;
  message: string;
}
