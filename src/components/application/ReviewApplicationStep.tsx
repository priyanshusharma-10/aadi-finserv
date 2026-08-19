import { Button } from '../common/Button';
import { Edit2 } from 'lucide-react';
import type { ApplicationFormData, ApplicationStep } from '../../types/application';
import { formatINR } from '../../utils/formatting';
import styles from './ApplicationStep.module.css';

interface ReviewApplicationStepProps {
  data: ApplicationFormData;
  onSubmit: () => void;
  onBack: () => void;
  onEditStep: (step: ApplicationStep) => void;
  isSubmitting: boolean;
}

interface ReviewSectionProps {
  title: string;
  step: ApplicationStep;
  fields: { label: string; value: string }[];
  onEdit: (step: ApplicationStep) => void;
}

function ReviewSection({ title, step, fields, onEdit }: ReviewSectionProps) {
  return (
    <div className={styles.reviewSection}>
      <div className={styles.reviewSectionHeader}>
        <h3 className={styles.reviewSectionTitle}>{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(step)}
          leftIcon={<Edit2 size={14} />}
          aria-label={`Edit ${title}`}
        >
          Edit
        </Button>
      </div>
      <div className={styles.reviewGrid}>
        {fields.map((field) => (
          <div key={field.label} className={styles.reviewField}>
            <span className={styles.reviewLabel}>{field.label}</span>
            <span className={styles.reviewValue}>{field.value || '—'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReviewApplicationStep({
  data,
  onSubmit,
  onBack,
  onEditStep,
  isSubmitting,
}: ReviewApplicationStepProps) {
  const { personalDetails: p, employmentDetails: e, loanDetails: l } = data;

  return (
    <div>
      <div className={styles.stepContent}>
        <div className={styles.sectionTitle}>Review Your Application</div>

        <ReviewSection
          title="Personal Details"
          step={1}
          onEdit={onEditStep}
          fields={[
            { label: 'Full Name', value: p.fullName },
            { label: 'Date of Birth', value: p.dateOfBirth },
            { label: 'Mobile', value: p.mobile },
            { label: 'Email', value: p.email },
            { label: 'PAN', value: p.pan ? `${p.pan.slice(0, 3)}*****${p.pan.slice(-2)}` : '' },
            { label: 'Aadhaar', value: p.aadhaar ? `XXXX XXXX ${p.aadhaar.slice(-4)}` : '' },
            { label: 'City', value: p.city },
            { label: 'State', value: p.state },
          ]}
        />

        <ReviewSection
          title="Employment Details"
          step={2}
          onEdit={onEditStep}
          fields={[
            { label: 'Employment Type', value: e.employmentType.replace('-', ' ') },
            { label: 'Employer / Business', value: e.employerName },
            { label: 'Monthly Income', value: e.monthlyIncome ? formatINR(Number(e.monthlyIncome)) : '' },
            { label: 'Work Experience', value: e.workExperience ? `${e.workExperience} years` : '' },
            { label: 'Existing EMI', value: e.existingEmi ? formatINR(Number(e.existingEmi)) : '₹0' },
            { label: 'Bank Account', value: e.bankAccountType },
          ]}
        />

        <ReviewSection
          title="Loan Details"
          step={3}
          onEdit={onEditStep}
          fields={[
            { label: 'Loan Amount', value: l.loanAmount ? formatINR(Number(l.loanAmount)) : '' },
            { label: 'Tenure', value: l.tenure ? `${l.tenure} months` : '' },
            { label: 'Purpose', value: l.loanPurpose.replace('-', ' ') },
          ]}
        />

        <p className={styles.reviewDisclaimer}>
          By submitting, you authorise Aadi Finserv to verify the information provided and obtain your
          credit bureau report. This is a demo application — no real data is processed.
        </p>
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={onSubmit}
          loading={isSubmitting}
        >
          Submit Application
        </Button>
      </div>
    </div>
  );
}
