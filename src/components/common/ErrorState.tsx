import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';
import styles from './ErrorState.module.css';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try again',
}: ErrorStateProps) {
  return (
    <div className={styles.wrapper} role="alert">
      <div className={styles.icon}>
        <AlertTriangle size={32} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} size="sm">
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
