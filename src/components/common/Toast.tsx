import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { Toast, ToastType } from '../../hooks/useToast';
import styles from './Toast.module.css';

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

const iconMap: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const Icon = iconMap[toast.type];

  return (
    <div className={`${styles.toast} ${styles[toast.type]}`} role="alert" aria-live="polite">
      <Icon size={18} className={styles.icon} aria-hidden="true" />
      <p className={styles.message}>{toast.message}</p>
      <button
        className={styles.dismiss}
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className={styles.container} aria-label="Notifications">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
