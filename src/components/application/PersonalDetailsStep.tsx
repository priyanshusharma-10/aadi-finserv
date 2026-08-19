import { useState } from 'react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import type { PersonalDetails } from '../../types/application';
import { validatePersonalDetails, hasErrors } from '../../utils/validation';
import styles from './ApplicationStep.module.css';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Chandigarh', 'Puducherry', 'Lakshadweep', 'Andaman and Nicobar Islands',
];

interface PersonalDetailsStepProps {
  data: PersonalDetails;
  onChange: (updates: Partial<PersonalDetails>) => void;
  onNext: () => void;
}

export function PersonalDetailsStep({ data, onChange, onNext }: PersonalDetailsStepProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalDetails, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof PersonalDetails, boolean>>>({});

  const handleChange =
    (field: keyof PersonalDetails) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = field === 'pan' ? e.target.value.toUpperCase() : e.target.value;
      onChange({ [field]: value });
      if (touched[field]) {
        const newErrors = validatePersonalDetails({ ...data, [field]: value });
        setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
      }
    };

  const handleBlur = (field: keyof PersonalDetails) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validatePersonalDetails(data);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validatePersonalDetails(data);
    if (hasErrors(validationErrors as Record<string, string | undefined>)) {
      setErrors(validationErrors);
      setTouched(Object.fromEntries(Object.keys(validationErrors).map((k) => [k, true])));
      return;
    }
    onNext();
  };

  const stateOptions = INDIAN_STATES.map((s) => ({ value: s, label: s }));

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.stepContent}>
        <div className={styles.sectionTitle}>Personal Information</div>
        <div className={styles.grid2}>
          <Input
            label="Full Name"
            type="text"
            value={data.fullName}
            onChange={handleChange('fullName')}
            onBlur={handleBlur('fullName')}
            error={errors.fullName}
            placeholder="As on PAN / Aadhaar"
            required
            autoComplete="name"
          />
          <Input
            label="Date of Birth"
            type="date"
            value={data.dateOfBirth}
            onChange={handleChange('dateOfBirth')}
            onBlur={handleBlur('dateOfBirth')}
            error={errors.dateOfBirth}
            required
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className={styles.grid2}>
          <Input
            label="Mobile Number"
            type="tel"
            value={data.mobile}
            onChange={handleChange('mobile')}
            onBlur={handleBlur('mobile')}
            error={errors.mobile}
            placeholder="10-digit mobile number"
            required
            autoComplete="tel"
            maxLength={10}
          />
          <Input
            label="Email Address"
            type="email"
            value={data.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            placeholder="your@email.com"
            required
            autoComplete="email"
          />
        </div>

        <div className={styles.sectionTitle}>Identity Documents</div>
        <div className={styles.grid2}>
          <Input
            label="PAN Number"
            type="text"
            value={data.pan}
            onChange={handleChange('pan')}
            onBlur={handleBlur('pan')}
            error={errors.pan}
            placeholder="ABCDE1234F"
            required
            maxLength={10}
            hint="10-character alphanumeric PAN"
          />
          <Input
            label="Aadhaar Number"
            type="text"
            value={data.aadhaar}
            onChange={handleChange('aadhaar')}
            onBlur={handleBlur('aadhaar')}
            error={errors.aadhaar}
            placeholder="12-digit Aadhaar"
            required
            maxLength={12}
            hint="Your 12-digit Aadhaar number"
          />
        </div>

        <div className={styles.sectionTitle}>Address</div>
        <Input
          label="Street Address"
          type="text"
          value={data.address}
          onChange={handleChange('address')}
          onBlur={handleBlur('address')}
          error={errors.address}
          placeholder="House / flat no., street, area"
          required
          autoComplete="street-address"
        />

        <div className={styles.grid3}>
          <Input
            label="City"
            type="text"
            value={data.city}
            onChange={handleChange('city')}
            onBlur={handleBlur('city')}
            error={errors.city}
            placeholder="City"
            required
            autoComplete="address-level2"
          />
          <Select
            label="State"
            options={stateOptions}
            value={data.state}
            onChange={handleChange('state')}
            error={errors.state}
            placeholder="Select state"
            required
          />
          <Input
            label="PIN Code"
            type="text"
            value={data.pinCode}
            onChange={handleChange('pinCode')}
            onBlur={handleBlur('pinCode')}
            error={errors.pinCode}
            placeholder="6-digit PIN"
            required
            maxLength={6}
            autoComplete="postal-code"
          />
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="submit" variant="primary" size="lg">
          Continue to Employment Details
        </Button>
      </div>
    </form>
  );
}
