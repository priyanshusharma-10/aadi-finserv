import { useState } from 'react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import type { EmploymentDetails } from '../../types/application';
import { validateEmploymentDetails, hasErrors } from '../../utils/validation';
import styles from './ApplicationStep.module.css';

const employmentTypeOptions = [
  { value: 'salaried', label: 'Salaried Employee' },
  { value: 'self-employed', label: 'Self-Employed Individual' },
  { value: 'business-owner', label: 'Business Owner' },
  { value: 'professional', label: 'Professional (Doctor / CA / Lawyer)' },
];

const workExperienceOptions = [
  { value: '0-1', label: 'Less than 1 year' },
  { value: '1-2', label: '1 – 2 years' },
  { value: '2-5', label: '2 – 5 years' },
  { value: '5-10', label: '5 – 10 years' },
  { value: '10+', label: 'More than 10 years' },
];

const bankAccountOptions = [
  { value: 'savings', label: 'Savings Account' },
  { value: 'current', label: 'Current Account' },
  { value: 'salary', label: 'Salary Account' },
];

interface EmploymentDetailsStepProps {
  data: EmploymentDetails;
  onChange: (updates: Partial<EmploymentDetails>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function EmploymentDetailsStep({
  data,
  onChange,
  onNext,
  onBack,
}: EmploymentDetailsStepProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof EmploymentDetails, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EmploymentDetails, boolean>>>({});

  const handleChange =
    (field: keyof EmploymentDetails) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange({ [field]: e.target.value });
      if (touched[field]) {
        const newErrors = validateEmploymentDetails({ ...data, [field]: e.target.value });
        setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
      }
    };

  const handleBlur = (field: keyof EmploymentDetails) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateEmploymentDetails(data);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateEmploymentDetails(data);
    if (hasErrors(validationErrors as Record<string, string | undefined>)) {
      setErrors(validationErrors);
      setTouched(Object.fromEntries(Object.keys(validationErrors).map((k) => [k, true])));
      return;
    }
    onNext();
  };

  const isSalaried = data.employmentType === 'salaried';

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.stepContent}>
        <div className={styles.sectionTitle}>Employment Information</div>

        <Select
          label="Employment Type"
          options={employmentTypeOptions}
          value={data.employmentType}
          onChange={handleChange('employmentType')}
          error={errors.employmentType}
          placeholder="Select employment type"
          required
        />

        <div className={styles.grid2}>
          <Input
            label={isSalaried ? 'Employer Name' : 'Business / Practice Name'}
            type="text"
            value={data.employerName}
            onChange={handleChange('employerName')}
            onBlur={handleBlur('employerName')}
            error={errors.employerName}
            placeholder={isSalaried ? 'Name of company' : 'Business or practice name'}
            required
          />
          <Select
            label="Work Experience"
            options={workExperienceOptions}
            value={data.workExperience}
            onChange={handleChange('workExperience')}
            error={errors.workExperience}
            placeholder="Select experience"
            required
          />
        </div>

        <div className={styles.sectionTitle}>Income & Banking</div>
        <div className={styles.grid2}>
          <Input
            label="Monthly Income (Net)"
            type="number"
            value={data.monthlyIncome}
            onChange={handleChange('monthlyIncome')}
            onBlur={handleBlur('monthlyIncome')}
            error={errors.monthlyIncome}
            placeholder="₹ Monthly take-home income"
            required
            leftAdornment="₹"
            min={0}
          />
          <Input
            label="Existing EMI Obligations"
            type="number"
            value={data.existingEmi}
            onChange={handleChange('existingEmi')}
            onBlur={handleBlur('existingEmi')}
            error={errors.existingEmi}
            placeholder="₹ Total current EMIs"
            leftAdornment="₹"
            min={0}
            hint="Leave blank or 0 if none"
          />
        </div>

        <Select
          label="Bank Account Type"
          options={bankAccountOptions}
          value={data.bankAccountType}
          onChange={handleChange('bankAccountType')}
          error={errors.bankAccountType}
          placeholder="Select account type"
          required
        />
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="primary" size="lg">
          Continue to Loan Details
        </Button>
      </div>
    </form>
  );
}
