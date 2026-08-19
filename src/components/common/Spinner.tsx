import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export function Spinner({ size = 'md', label = 'Loading...' }: SpinnerProps) {
  return (
    <div className={`${styles.spinner} ${styles[size]}`} role="status" aria-label={label}>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function FullPageSpinner() {
  return (
    <div className={styles.fullPage}>
      <Spinner size="lg" />
    </div>
  );
}
