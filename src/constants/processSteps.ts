import type { ProcessStep } from '../types/loan';

export const processSteps: ProcessStep[] = [
  {
    id: 'step-1',
    number: '01',
    title: 'Initial Consultation',
    description:
      'Contact us via phone, WhatsApp, or our online form. Our expert advisors will understand your financial requirements, assess your eligibility, and recommend the most suitable loan product with competitive rates.',
  },
  {
    id: 'step-2',
    number: '02',
    title: 'Document Submission',
    description:
      'Provide the necessary KYC, income, and property documents. Our team guides you through the exact checklist for your specific loan type, ensuring a hassle-free and error-free application.',
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Processing & Approval',
    description:
      'We liaise directly with our extensive network of top-tier banking and NBFC partners to process your application swiftly, negotiating the best possible terms and fastest approval for your profile.',
  },
  {
    id: 'step-4',
    number: '04',
    title: 'Quick Disbursal',
    description:
      'Once approved, funds are disbursed directly to your bank account. We ensure complete transparency throughout the disbursal process — no hidden charges, 100% customer satisfaction guaranteed.',
  },
];
