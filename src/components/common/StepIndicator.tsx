import { Check } from 'lucide-react';
import styles from './StepIndicator.module.css';

interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <nav aria-label="Application progress" className={styles.nav}>
      <ol className={styles.list}>
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isClickable = onStepClick && isCompleted;

          return (
            <li key={step.number} className={styles.item}>
              {index > 0 && (
                <div
                  className={`${styles.connector} ${isCompleted ? styles.connectorCompleted : ''}`}
                  aria-hidden="true"
                />
              )}
              <div className={styles.stepWrapper}>
                <button
                  className={`${styles.circle} ${isCompleted ? styles.completed : ''} ${isCurrent ? styles.current : ''}`}
                  onClick={isClickable ? () => onStepClick(step.number) : undefined}
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={`Step ${step.number}: ${step.label}${isCompleted ? ' (completed)' : ''}`}
                  disabled={!isClickable}
                  type="button"
                >
                  {isCompleted ? <Check size={14} /> : <span>{step.number}</span>}
                </button>
                <span className={`${styles.label} ${isCurrent ? styles.labelCurrent : ''}`}>
                  {step.label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
