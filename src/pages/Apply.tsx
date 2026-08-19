import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { StepIndicator } from '../components/common/StepIndicator';
import { PersonalDetailsStep } from '../components/application/PersonalDetailsStep';
import { EmploymentDetailsStep } from '../components/application/EmploymentDetailsStep';
import { LoanDetailsStep } from '../components/application/LoanDetailsStep';
import { DocumentUploadStep } from '../components/application/DocumentUploadStep';
import { ReviewApplicationStep } from '../components/application/ReviewApplicationStep';
import { ApplicationSuccess } from '../components/application/ApplicationSuccess';
import { useApplicationForm } from '../hooks/useApplicationForm';
import { useDocumentUpload } from '../hooks/useDocumentUpload';
import { loanService } from '../services/loanService';
import type { ApplicationStep } from '../types/application';
import styles from './Apply.module.css';

const STEPS = [
  { number: 1, label: 'Personal Details' },
  { number: 2, label: 'Employment' },
  { number: 3, label: 'Loan Details' },
  { number: 4, label: 'Documents' },
  { number: 5, label: 'Review' },
];

export function Apply() {
  const form = useApplicationForm();
  const docUpload = useDocumentUpload();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      const result = await loanService.submitApplication({
        ...form.formData,
        documentUpload: { files: docUpload.files },
      });
      setApplicationId(result.applicationId);
      form.nextStep(); // go to step 6 (success)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Submission failed. Please try again.';
      setSubmissionError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartOver = () => {
    form.resetForm();
    setApplicationId(null);
    setSubmissionError(null);
  };

  const isSuccessStep = form.currentStep === 6;

  return (
    <>
      <Helmet>
        <title>Apply for a Loan — Aadi Finserv</title>
        <meta
          name="description"
          content="Apply for a personal or business loan from Aadi Finserv in Indore. Fast 24-hr approval, transparent terms, and competitive rates."
        />
      </Helmet>

      <main className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <h1 className={styles.title}>
              {isSuccessStep ? 'Application Submitted' : 'Apply for a Loan'}
            </h1>
            {!isSuccessStep && (
              <p className={styles.subtitle}>
                Complete the steps below. Your progress is saved automatically.
              </p>
            )}
          </div>

          {!isSuccessStep && (
            <div className={styles.stepIndicatorWrapper}>
              <StepIndicator
                steps={STEPS}
                currentStep={form.currentStep}
                onStepClick={(step) => {
                  if (step < form.currentStep) form.goToStep(step as ApplicationStep);
                }}
              />
            </div>
          )}

          <div className={styles.formCard}>
            {form.currentStep === 1 && (
              <PersonalDetailsStep
                data={form.formData.personalDetails}
                onChange={form.updatePersonalDetails}
                onNext={form.nextStep}
              />
            )}
            {form.currentStep === 2 && (
              <EmploymentDetailsStep
                data={form.formData.employmentDetails}
                onChange={form.updateEmploymentDetails}
                onNext={form.nextStep}
                onBack={form.prevStep}
              />
            )}
            {form.currentStep === 3 && (
              <LoanDetailsStep
                data={form.formData.loanDetails}
                onChange={form.updateLoanDetails}
                onNext={form.nextStep}
                onBack={form.prevStep}
              />
            )}
            {form.currentStep === 4 && (
              <DocumentUploadStep
                employmentType={form.formData.employmentDetails.employmentType}
                files={docUpload.files}
                onUpload={docUpload.uploadFile}
                onRemove={docUpload.removeFile}
                onNext={form.nextStep}
                onBack={form.prevStep}
              />
            )}
            {form.currentStep === 5 && (
              <>
                {submissionError && (
                  <div className={styles.submissionError} role="alert">
                    {submissionError}
                  </div>
                )}
                <ReviewApplicationStep
                  data={form.formData}
                  onSubmit={handleSubmit}
                  onBack={form.prevStep}
                  onEditStep={form.goToStep}
                  isSubmitting={isSubmitting}
                />
              </>
            )}
            {isSuccessStep && applicationId && (
              <ApplicationSuccess
                applicationId={applicationId}
                onStartOver={handleStartOver}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
