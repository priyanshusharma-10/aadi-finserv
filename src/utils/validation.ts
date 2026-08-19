import type { PersonalDetails, EmploymentDetails, LoanDetails } from '../types/application';
import { loanConfig } from '../config/loanConfig';

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

// ── Field-level validators ──────────────────────────────────────────────────

export function isRequired(value: string): string | null {
  return value.trim() ? null : 'This field is required.';
}

export function validateFullName(value: string): string | null {
  if (!value.trim()) return 'Full name is required.';
  if (value.trim().length < 3) return 'Name must be at least 3 characters.';
  if (!/^[A-Za-z\s.'-]+$/.test(value.trim())) return 'Please enter a valid name.';
  return null;
}

export function validateMobile(value: string): string | null {
  const digits = value.replace(/\D/g, '');
  if (!digits) return 'Mobile number is required.';
  if (!/^[6-9]\d{9}$/.test(digits)) return 'Please enter a valid 10-digit mobile number.';
  return null;
}

export function validateEmail(value: string): string | null {
  if (!value.trim()) return 'Email address is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.';
  return null;
}

export function validatePAN(value: string): string | null {
  if (!value.trim()) return 'PAN number is required.';
  if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.trim().toUpperCase())) {
    return 'Please enter a valid PAN (e.g. ABCDE1234F).';
  }
  return null;
}

export function validateAadhaar(value: string): string | null {
  const digits = value.replace(/\D/g, '');
  if (!digits) return 'Aadhaar number is required.';
  if (!/^\d{12}$/.test(digits)) return 'Please enter a valid 12-digit Aadhaar number.';
  return null;
}

export function validateDateOfBirth(value: string): string | null {
  if (!value) return 'Date of birth is required.';
  const dob = new Date(value);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  const actualAge = hasBirthdayPassed ? age : age - 1;

  if (isNaN(dob.getTime())) return 'Please enter a valid date.';
  if (actualAge < loanConfig.minAge) return `You must be at least ${loanConfig.minAge} years old.`;
  if (actualAge > loanConfig.maxAge) return `Applicant age must be ${loanConfig.maxAge} years or below.`;
  return null;
}

export function validatePinCode(value: string): string | null {
  const digits = value.replace(/\D/g, '');
  if (!digits) return 'PIN code is required.';
  if (!/^\d{6}$/.test(digits)) return 'Please enter a valid 6-digit PIN code.';
  return null;
}

export function validateIncome(value: string): string | null {
  const amount = parseFloat(value);
  if (!value.trim()) return 'Monthly income is required.';
  if (isNaN(amount) || amount <= 0) return 'Please enter a valid income amount.';
  if (amount < loanConfig.minIncome) {
    return `Minimum monthly income required is ₹${loanConfig.minIncome.toLocaleString('en-IN')}.`;
  }
  return null;
}

export function validateLoanAmount(value: string): string | null {
  const amount = parseFloat(value);
  if (!value.trim()) return 'Loan amount is required.';
  if (isNaN(amount) || amount <= 0) return 'Please enter a valid loan amount.';
  if (amount < loanConfig.minAmount) return `Minimum loan amount is ₹${loanConfig.minAmount.toLocaleString('en-IN')}.`;
  if (amount > loanConfig.maxAmount) return `Maximum loan amount is ₹${loanConfig.maxAmount.toLocaleString('en-IN')}.`;
  return null;
}

export function validateFile(
  file: File,
  maxSizeMb = loanConfig.maxFileSizeMb,
  allowedTypes = loanConfig.allowedFileTypes
): string | null {
  const maxBytes = maxSizeMb * 1024 * 1024;
  if (file.size > maxBytes) return `File size must not exceed ${maxSizeMb}MB.`;
  if (!allowedTypes.includes(file.type)) {
    return 'Only PDF, JPG, JPEG, and PNG files are allowed.';
  }
  return null;
}

// ── Step-level validators ───────────────────────────────────────────────────

export function validatePersonalDetails(
  data: PersonalDetails
): ValidationErrors<PersonalDetails> {
  const errors: ValidationErrors<PersonalDetails> = {};

  const fullNameErr = validateFullName(data.fullName);
  if (fullNameErr) errors.fullName = fullNameErr;

  const dobErr = validateDateOfBirth(data.dateOfBirth);
  if (dobErr) errors.dateOfBirth = dobErr;

  const mobileErr = validateMobile(data.mobile);
  if (mobileErr) errors.mobile = mobileErr;

  const emailErr = validateEmail(data.email);
  if (emailErr) errors.email = emailErr;

  const panErr = validatePAN(data.pan);
  if (panErr) errors.pan = panErr;

  const aadhaarErr = validateAadhaar(data.aadhaar);
  if (aadhaarErr) errors.aadhaar = aadhaarErr;

  const addressErr = isRequired(data.address);
  if (addressErr) errors.address = 'Address is required.';

  const cityErr = isRequired(data.city);
  if (cityErr) errors.city = 'City is required.';

  const stateErr = isRequired(data.state);
  if (stateErr) errors.state = 'State is required.';

  const pinErr = validatePinCode(data.pinCode);
  if (pinErr) errors.pinCode = pinErr;

  return errors;
}

export function validateEmploymentDetails(
  data: EmploymentDetails
): ValidationErrors<EmploymentDetails> {
  const errors: ValidationErrors<EmploymentDetails> = {};

  if (!data.employmentType) errors.employmentType = 'Please select your employment type.';

  const nameErr = isRequired(data.employerName);
  if (nameErr) errors.employerName = 'Employer / business name is required.';

  const incomeErr = validateIncome(data.monthlyIncome);
  if (incomeErr) errors.monthlyIncome = incomeErr;

  const expErr = isRequired(data.workExperience);
  if (expErr) errors.workExperience = 'Work experience is required.';

  if (!data.bankAccountType) errors.bankAccountType = 'Please select your bank account type.';

  return errors;
}

export function validateLoanDetails(data: LoanDetails): ValidationErrors<LoanDetails> {
  const errors: ValidationErrors<LoanDetails> = {};

  const amountErr = validateLoanAmount(data.loanAmount);
  if (amountErr) errors.loanAmount = amountErr;

  if (!data.tenure) errors.tenure = 'Please select a loan tenure.';
  if (!data.loanPurpose) errors.loanPurpose = 'Please select a loan purpose.';

  return errors;
}

export function hasErrors(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).some(Boolean);
}
