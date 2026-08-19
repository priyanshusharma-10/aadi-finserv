import type { EmiResult } from '../../types/loan';
import { formatINR, formatPercentage } from '../../utils/formatting';
import styles from './EmiBreakdown.module.css';

interface EmiBreakdownProps {
  result: EmiResult;
  interestRate: number;
  tenure: number;
}

export function EmiBreakdown({ result, interestRate, tenure }: EmiBreakdownProps) {
  return (
    <div className={styles.wrapper}>
      {/* Primary EMI display */}
      <div className={styles.emiDisplay}>
        <p className={styles.emiLabel}>Monthly EMI</p>
        <p className={styles.emiAmount}>{formatINR(result.emi)}</p>
        <p className={styles.emiMeta}>
          at {formatPercentage(interestRate)} p.a. for {tenure} months
        </p>
      </div>

      {/* Breakdown bar */}
      <div className={styles.breakdownBar}>
        <div
          className={styles.principalBar}
          style={{ width: `${result.principalPercent}%` }}
          title={`Principal: ${formatPercentage(result.principalPercent)}`}
          aria-label={`Principal ${formatPercentage(result.principalPercent)}`}
        />
        <div
          className={styles.interestBar}
          style={{ width: `${result.interestPercent}%` }}
          title={`Interest: ${formatPercentage(result.interestPercent)}`}
          aria-label={`Interest ${formatPercentage(result.interestPercent)}`}
        />
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotPrincipal}`} />
          <span className={styles.legendLabel}>Principal</span>
          <span className={styles.legendPercent}>{formatPercentage(result.principalPercent)}</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotInterest}`} />
          <span className={styles.legendLabel}>Interest</span>
          <span className={styles.legendPercent}>{formatPercentage(result.interestPercent)}</span>
        </div>
      </div>

      {/* Summary stats */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Principal</span>
          <span className={styles.statValue}>{formatINR(result.emi * tenure - result.totalInterest)}</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statLabel}>Total Interest</span>
          <span className={styles.statValue}>{formatINR(result.totalInterest)}</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statLabel}>Total Payment</span>
          <span className={`${styles.statValue} ${styles.statTotal}`}>{formatINR(result.totalPayment)}</span>
        </div>
      </div>
    </div>
  );
}
