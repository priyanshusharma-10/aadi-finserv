import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  leftAdornment?: ReactNode;
  rightAdornment?: ReactNode;
  required?: boolean;
}

export function Input({
  label,
  error,
  hint,
  leftAdornment,
  rightAdornment,
  required,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ');

  return (
    <div className={`${styles.field} ${className}`}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
        {required && <span className={styles.required} aria-hidden="true">*</span>}
      </label>
      <div className={`${styles.inputWrapper} ${error ? styles.hasError : ''}`}>
        {leftAdornment && <span className={styles.leftAdornment}>{leftAdornment}</span>}
        <input
          id={inputId}
          className={styles.input}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          {...props}
        />
        {rightAdornment && <span className={styles.rightAdornment}>{rightAdornment}</span>}
      </div>
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
    </div>
  );
}
