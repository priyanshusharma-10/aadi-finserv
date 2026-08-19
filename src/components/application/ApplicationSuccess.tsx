import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import styles from './ApplicationStep.module.css';

interface ApplicationSuccessProps {
  applicationId: string;
  onStartOver: () => void;
}

export function ApplicationSuccess({ applicationId, onStartOver }: ApplicationSuccessProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.successWrapper}>
      <div className={styles.successIcon}>
        <CheckCircle size={44} />
      </div>

      <div>
        <h2 className={styles.successTitle}>Application Submitted!</h2>
        <p className={styles.successSubtitle}>
          Your personal loan application has been received. We'll begin processing it immediately
          and keep you updated at every step.
        </p>
      </div>

      <div className={styles.refCard}>
        <p className={styles.refLabel}>Application Reference</p>
        <p className={styles.refNumber}>{applicationId}</p>
        <p className={styles.refLabel}>Save this number to track your application</p>
      </div>

      <div className={styles.nextSteps}>
        <p className={styles.nextStepsTitle}>What happens next?</p>
        <ul className={styles.nextStepsList}>
          {[
            'Our team will verify your documents within 24 hours',
            'A credit assessment will be conducted based on your profile',
            "You'll receive a loan offer via SMS and email",
            'Funds are credited to your account within 1–2 business days of approval',
          ].map((step, i) => (
            <li key={i} className={styles.nextStep}>
              <span className={styles.nextStepNum}>{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.successActions}>
        <Button
          variant="primary"
          onClick={() => navigate('/application-status')}
        >
          Track Application
        </Button>
        <Button variant="outline" onClick={onStartOver}>
          Apply for Another Loan
        </Button>
        <Button variant="ghost" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
