import type { SelectHTMLAttributes } from 'react';
import styles from './Select.module.css';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  hint?: string;
  placeholder?: string;
  required?: boolean;
}

export function Select({
  label,
  options,
  error,
  hint,
  placeholder = 'Select an option',
  required,
  id,
  className = '',
  ...props
}: SelectProps) {
  const selectId = id ?? `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${selectId}-error`;

  return (
    <div className={`${styles.field} ${className}`}>
      <label className={styles.label} htmlFor={selectId}>
        {label}
        {required && <span className={styles.required} aria-hidden="true">*</span>}
      </label>
      <div className={`${styles.selectWrapper} ${error ? styles.hasError : ''}`}>
        <select
          id={selectId}
          className={styles.select}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className={styles.arrow} aria-hidden="true">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
