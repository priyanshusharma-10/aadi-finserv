import { useState, useCallback } from 'react';
import type {
  ApplicationFormData,
  ApplicationStep,
  PersonalDetails,
  EmploymentDetails,
  LoanDetails,
  DocumentUpload,
} from '../types/application';
import { loanConfig } from '../config/loanConfig';

const STORAGE_KEY = 'sugam_application_draft';

const initialPersonalDetails: PersonalDetails = {
  fullName: '',
  dateOfBirth: '',
  mobile: '',
  email: '',
  pan: '',
  aadhaar: '',
  address: '',
  city: '',
  state: '',
  pinCode: '',
};

const initialEmploymentDetails: EmploymentDetails = {
  employmentType: '',
  employerName: '',
  monthlyIncome: '',
  workExperience: '',
  existingEmi: '',
  bankAccountType: '',
};

const initialLoanDetails: LoanDetails = {
  loanAmount: loanConfig.defaultLoanAmount.toString(),
  tenure: loanConfig.defaultTenure.toString(),
  loanPurpose: '',
};

const initialDocumentUpload: DocumentUpload = { files: {} };

const initialFormData: ApplicationFormData = {
  personalDetails: initialPersonalDetails,
  employmentDetails: initialEmploymentDetails,
  loanDetails: initialLoanDetails,
  documentUpload: initialDocumentUpload,
};

function loadDraft(): Partial<ApplicationFormData> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    // Only restore non-sensitive fields (no PAN, Aadhaar)
    const parsed = JSON.parse(raw) as Partial<ApplicationFormData>;
    if (parsed.personalDetails) {
      parsed.personalDetails.pan = '';
      parsed.personalDetails.aadhaar = '';
    }
    return parsed;
  } catch {
    return {};
  }
}

function saveDraft(data: ApplicationFormData) {
  try {
    const safe = {
      ...data,
      personalDetails: {
        ...data.personalDetails,
        pan: '',
        aadhaar: '',
      },
      documentUpload: { files: {} }, // never persist file references
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
  } catch {
    // Storage might be unavailable — fail silently
  }
}

export function useApplicationForm() {
  const draft = loadDraft();

  const [currentStep, setCurrentStep] = useState<ApplicationStep>(1);
  const [formData, setFormData] = useState<ApplicationFormData>({
    ...initialFormData,
    ...draft,
    documentUpload: initialDocumentUpload,
  });

  const updatePersonalDetails = useCallback((updates: Partial<PersonalDetails>) => {
    setFormData((prev) => {
      const updated = { ...prev, personalDetails: { ...prev.personalDetails, ...updates } };
      saveDraft(updated);
      return updated;
    });
  }, []);

  const updateEmploymentDetails = useCallback((updates: Partial<EmploymentDetails>) => {
    setFormData((prev) => {
      const updated = { ...prev, employmentDetails: { ...prev.employmentDetails, ...updates } };
      saveDraft(updated);
      return updated;
    });
  }, []);

  const updateLoanDetails = useCallback((updates: Partial<LoanDetails>) => {
    setFormData((prev) => {
      const updated = { ...prev, loanDetails: { ...prev.loanDetails, ...updates } };
      saveDraft(updated);
      return updated;
    });
  }, []);

  const updateDocumentUpload = useCallback((updates: Partial<DocumentUpload>) => {
    setFormData((prev) => ({
      ...prev,
      documentUpload: { ...prev.documentUpload, ...updates },
    }));
  }, []);

  const goToStep = useCallback((step: ApplicationStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, 6) as ApplicationStep;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return next;
    });
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = Math.max(prev - 1, 1) as ApplicationStep;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return next;
    });
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(1);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    currentStep,
    formData,
    updatePersonalDetails,
    updateEmploymentDetails,
    updateLoanDetails,
    updateDocumentUpload,
    goToStep,
    nextStep,
    prevStep,
    resetForm,
  };
}
