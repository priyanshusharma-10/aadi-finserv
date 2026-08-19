import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { loanService } from '../../services/loanService';
import { validateFullName, validateMobile, validateEmail, hasErrors } from '../../utils/validation';
import type { AdvisorContactForm } from '../../types/application';
import styles from './AdvisorModal.module.css';

interface AdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const callTimeOptions = [
  { value: 'morning', label: 'Morning (9 AM – 12 PM)' },
  { value: 'afternoon', label: 'Afternoon (12 PM – 3 PM)' },
  { value: 'evening', label: 'Evening (3 PM – 6 PM)' },
  { value: 'anytime', label: 'Any time' },
];

type Status = 'idle' | 'loading' | 'success' | 'error';

type AdvisorErrors = Partial<Record<keyof AdvisorContactForm, string>>;

export function AdvisorModal({ isOpen, onClose }: AdvisorModalProps) {
  const [form, setForm] = useState<AdvisorContactForm>({
    name: '',
    mobile: '',
    email: '',
    preferredTime: '',
    message: '',
  });
  const [errors, setErrors] = useState<AdvisorErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const update = (field: keyof AdvisorContactForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): AdvisorErrors => {
    const newErrors: AdvisorErrors = {};
    const nameErr = validateFullName(form.name);
    if (nameErr) newErrors.name = nameErr;
    const mobileErr = validateMobile(form.mobile);
    if (mobileErr) newErrors.mobile = mobileErr;
    const emailErr = validateEmail(form.email);
    if (emailErr) newErrors.email = emailErr;
    if (!form.preferredTime) newErrors.preferredTime = 'Please select a preferred call time.';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (hasErrors(newErrors as Record<string, string | undefined>)) {
      setErrors(newErrors);
      return;
    }
    setStatus('loading');
    try {
      await loanService.contactAdvisor(form);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleClose = () => {
    setStatus('idle');
    setForm({ name: '', mobile: '', email: '', preferredTime: '', message: '' });
    setErrors({});
    onClose();
  };  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Talk to an Advisor"
      description="Our experts are available Mon–Sat, 10 AM–7 PM. Leave your details and we'll call you back."
    >
      {status === 'success' ? (
        <div className={styles.success}>
          <div className={styles.successIcon}>
            <CheckCircle size={36} />
          </div>
          <h3 className={styles.successTitle}>We'll be in touch soon!</h3>
          <p className={styles.successMessage}>
            Thank you for reaching out. One of our loan advisors will call you at your preferred time.
          </p>
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          {status === 'error' && (
            <div className={styles.errorBanner} role="alert">
              Something went wrong. Please try again or call us directly.
            </div>
          )}

          <Input
            label="Full Name"
            type="text"
            value={form.name}
            onChange={update('name')}
            error={errors.name}
            placeholder="Enter your full name"
            required
            autoComplete="name"
          />
          <Input
            label="Mobile Number"
            type="tel"
            value={form.mobile}
            onChange={update('mobile')}
            error={errors.mobile}
            placeholder="10-digit mobile number"
            required
            autoComplete="tel"
            maxLength={10}
          />
          <Input
            label="Email Address"
            type="email"
            value={form.email}
            onChange={update('email')}
            error={errors.email}
            placeholder="your@email.com"
            required
            autoComplete="email"
          />
          <Select
            label="Preferred Call Time"
            options={callTimeOptions}
            value={form.preferredTime}
            onChange={update('preferredTime')}
            error={errors.preferredTime}
            placeholder="Select preferred time"
            required
          />
          <div className={styles.textareaField}>
            <label className={styles.textareaLabel} htmlFor="advisor-message">
              Message <span className={styles.optional}>(optional)</span>
            </label>
            <textarea
              id="advisor-message"
              className={styles.textarea}
              value={form.message}
              onChange={update('message')}
              placeholder="Briefly describe your loan requirement..."
              rows={3}
            />
          </div>

          <div className={styles.actions}>
            <Button type="button" variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={status === 'loading'}>
              Request Callback
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
