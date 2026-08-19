import type { ChangeEvent } from 'react';
import styles from './Slider.module.css';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  id?: string;
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
  id,
}: SliderProps) {
  const sliderId = id ?? `slider-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const percent = ((value - min) / (max - min)) * 100;
  const displayValue = formatValue ? formatValue(value) : String(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.labelRow}>
        <label htmlFor={sliderId} className={styles.label}>{label}</label>
        <span className={styles.value}>{displayValue}</span>
      </div>
      <div className={styles.track}>
        <input
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className={styles.input}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={displayValue}
          style={{ '--percent': `${percent}%` } as React.CSSProperties}
        />
      </div>
      <div className={styles.rangeLabels}>
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
    </div>
  );
}
