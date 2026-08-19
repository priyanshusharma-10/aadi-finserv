import type { DocumentCategory } from '../types/loan';
import type { EmploymentType } from '../types/loan';

export const documentCategories: DocumentCategory[] = [
  {
    id: 'identity',
    title: 'Identity & KYC',
    description: 'Required for all applicants',
    documents: [
      {
        id: 'pan',
        title: 'PAN Card',
        description: 'Self-attested copy of PAN card (mandatory)',
        required: true,
      },
      {
        id: 'aadhaar',
        title: 'Aadhaar Card',
        description: 'Both sides of Aadhaar (e-Aadhaar accepted)',
        required: true,
      },
      {
        id: 'photo',
        title: 'Recent Photograph',
        description: 'Passport-size photograph, taken within 3 months',
        required: true,
      },
    ],
  },
  {
    id: 'income-salaried',
    title: 'Income — Salaried',
    description: 'For salaried employees',
    documents: [
      {
        id: 'salary-slips',
        title: 'Salary Slips',
        description: 'Latest 3 months salary slips from current employer',
        required: true,
      },
      {
        id: 'bank-statement-salaried',
        title: 'Bank Statement',
        description: '6 months bank statement of salary account',
        required: true,
      },
      {
        id: 'form-16',
        title: 'Form 16',
        description: 'Form 16 / TDS certificate for last financial year',
        required: true,
      },
    ],
  },
  {
    id: 'income-self-employed',
    title: 'Income — Self-Employed',
    description: 'For business owners & professionals',
    documents: [
      {
        id: 'itr',
        title: 'Income Tax Returns',
        description: 'ITR for last 2 financial years with computation',
        required: true,
      },
      {
        id: 'bank-statement-se',
        title: 'Bank Statement',
        description: '12 months bank statement of primary business account',
        required: true,
      },
      {
        id: 'gst',
        title: 'GST Registration',
        description: 'GST certificate (if annual turnover exceeds ₹40L)',
        required: false,
      },
    ],
  },
];

export const getRequiredDocuments = (employmentType: EmploymentType): string[] => {
  const base = ['pan', 'aadhaar', 'photo'];

  switch (employmentType) {
    case 'salaried':
      return [...base, 'salary-slips', 'bank-statement-salaried', 'form-16'];
    case 'self-employed':
    case 'business-owner':
      return [...base, 'itr', 'bank-statement-se', 'gst'];
    case 'professional':
      return [...base, 'salary-slips', 'itr', 'bank-statement-se'];
    default:
      return base;
  }
};

export const documentLabels: Record<string, string> = {
  pan: 'PAN Card',
  aadhaar: 'Aadhaar Card',
  photo: 'Recent Photograph',
  'salary-slips': 'Salary Slips (3 months)',
  'bank-statement-salaried': 'Bank Statement (6 months)',
  'form-16': 'Form 16',
  itr: 'Income Tax Returns',
  'bank-statement-se': 'Bank Statement (12 months)',
  gst: 'GST Registration',
};
