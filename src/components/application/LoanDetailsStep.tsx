import { useState } from 'react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import type { LoanDetails } from '../../types/application';
import { validateLoanDetails, hasErrors } from '../../utils/validation';
import { loanConfig } from '../../config/loanConfig';
import { calculateEMI } from '../../utils/emiCalculator';
import { formatINR, formatPercentage } from '../../utils/formatting';
import styles from './ApplicationStep.module.css';
import previewStyles from './LoanDetailsStep.module.css';

const loanPurposeOptions = [
  { value: 'medical', label: 'Medical Emergency' },
  { value: 'education', label: 'Education' },
  { value: 'home-renovation', label: 'Home Renovation' },
  { value: 'wedding', label: 'Wedding / Personal Event' },
  { value: 'travel', label: 'Travel' },
  { value: 'debt-consolidation', label: 'Debt Consolidation' },
  { value: 'personal', label: 'Personal / Lifestyle' },
  { value: 'other', label: 'Other' },
];

const tenureOptions = Array.from(
  { length: (loanConfig.maxTenure - loanConfig.minTenure) / loanConfig.tenureStep + 1 },
  (_, i) => {
    const months = loanConfig.minTenure + i * loanConfig.tenureStep;
    const label =
      months < 12
        ? `${months} months`
        : `${months / 12} year${months / 12 > 1 ? 's' : ''} (${months} months)`;
    return { value: String(months), label };
  }
);

interface LoanDetailsStepProps {
  data: LoanDetails;
  onChange: (updates: Partial<LoanDetails>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function LoanDetailsStep({ data, onChange, onNext, onBack }: LoanDetailsStepProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof LoanDetails, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof LoanDetails, boolean>>>({});

  const handleChange =
    (field: keyof LoanDetails) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange({ [field]: e.target.value });
      if (touched[field]) {
        const newErrors = validateLoanDetails({ ...data, [field]: e.target.value });
        setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
      }
    };

  const handleBlur = (field: keyof LoanDetails) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateLoanDetails(data);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLoanDetails(data);
    if (hasErrors(validationErrors as Record<string, string | undefined>)) {
      setErrors(validationErrors);
      setTouched(Object.fromEntries(Object.keys(validationErrors).map((k) => [k, true])));
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.stepContent}>
        <div className={styles.sectionTitle}>Loan Requirements</div>

        <div className={styles.grid2}>
          <Input
            label="Loan Amount Required"
            type="number"
            value={data.loanAmount}
            onChange={handleChange('loanAmount')}
            onBlur={handleBlur('loanAmount')}
            error={errors.loanAmount}
            placeholder="Amount in ₹"
            required
            leftAdornment="₹"
            min={loanConfig.minAmount}
            max={loanConfig.maxAmount}
            hint={`₹${loanConfig.minAmount.toLocaleString('en-IN')} – ₹${loanConfig.maxAmount.toLocaleString('en-IN')}`}
          />
          <Select
            label="Preferred Tenure"
            options={tenureOptions}
            value={data.tenure}
            onChange={handleChange('tenure')}
            error={errors.tenure}
            placeholder="Select tenure"
            required
          />
        </div>

        <Select
          label="Loan Purpose"
          options={loanPurposeOptions}
          value={data.loanPurpose}
          onChange={handleChange('loanPurpose')}
          error={errors.loanPurpose}
          placeholder="Select purpose"
          required
        />

        {/* Live EMI preview */}
        {data.loanAmount && data.tenure && (
          <div className={styles.sectionTitle}>EMI Preview</div>
        )}
        {data.loanAmount && data.tenure && (
          <EmiCalculator compact showApplyButton={false} />
        )}
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="primary" size="lg">
          Continue to Documents
        </Button>
      </div>
    </form>
  );
}
