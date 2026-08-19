import { useNavigate } from 'react-router-dom';
import { useEmiCalculator } from '../../hooks/useEmiCalculator';
import { loanConfig } from '../../config/loanConfig';
import { formatINR } from '../../utils/formatting';
import { Slider } from '../common/Slider';
import { Button } from '../common/Button';
import { EmiBreakdown } from './EmiBreakdown';
import styles from './EmiCalculator.module.css';

interface EmiCalculatorProps {
  compact?: boolean;
  showApplyButton?: boolean;
}

export function EmiCalculator({ compact = false, showApplyButton = true }: EmiCalculatorProps) {
  const navigate = useNavigate();
  const {
    loanAmount,
    tenureValue,
    tenureUnit,
    tenureInMonths,
    interestRate,
    result,
    setLoanAmount,
    setTenureValue,
    setTenureUnit,
    setInterestRate,
  } = useEmiCalculator();

  const handleRateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      setInterestRate(Math.max(1, Math.min(50, val)));
    }
  };

  return (
    <div className={`${styles.calculator} ${compact ? styles.compact : ''}`}>
      {!compact && <h3 className={styles.title}>Live EMI Calculator</h3>}

      <div className={styles.controls}>
        {/* 1. Loan Amount */}
        <Slider
          label="Loan Amount"
          value={loanAmount}
          min={loanConfig.minAmount}
          max={loanConfig.maxAmount}
          step={loanConfig.amountStep}
          onChange={setLoanAmount}
          formatValue={formatINR}
          id="emi-loan-amount"
        />

        {/* 2. Tenure with Years / Months Unit Switch */}
        <div className={styles.tenureControlGroup}>
          <div className={styles.controlHeader}>
            <span className={styles.controlLabel}>Tenure Period</span>
            <div className={styles.unitToggleContainer}>
              <button
                type="button"
                className={`${styles.unitToggleBtn} ${tenureUnit === 'years' ? styles.activeUnit : ''}`}
                onClick={() => setTenureUnit('years')}
              >
                Years
              </button>
              <button
                type="button"
                className={`${styles.unitToggleBtn} ${tenureUnit === 'months' ? styles.activeUnit : ''}`}
                onClick={() => setTenureUnit('months')}
              >
                Months
              </button>
            </div>
          </div>

          <Slider
            label=""
            value={tenureValue}
            min={tenureUnit === 'years' ? loanConfig.minTenureYears : loanConfig.minTenureMonths}
            max={tenureUnit === 'years' ? loanConfig.maxTenureYears : loanConfig.maxTenureMonths}
            step={tenureUnit === 'years' ? loanConfig.tenureStepYears : loanConfig.tenureStepMonths}
            onChange={setTenureValue}
            formatValue={(v) =>
              tenureUnit === 'years' ? `${v} ${v === 1 ? 'Year' : 'Years'}` : `${v} Months`
            }
            id="emi-tenure"
          />
        </div>

        {/* 3. Dynamic Interest Rate Slider + Direct Input Box */}
        <div className={styles.rateControlGroup}>
          <div className={styles.controlHeader}>
            <label htmlFor="emi-rate-input" className={styles.controlLabel}>
              Interest Rate (% p.a.)
            </label>
            <div className={styles.rateInputWrap}>
              <input
                id="emi-rate-input"
                type="number"
                step="0.1"
                min={loanConfig.minRate}
                max={loanConfig.maxRate}
                value={interestRate}
                onChange={handleRateInputChange}
                className={styles.rateInput}
              />
              <span className={styles.rateSuffix}>%</span>
            </div>
          </div>

          <Slider
            label=""
            value={interestRate}
            min={loanConfig.minRate}
            max={loanConfig.maxRate}
            step={loanConfig.rateStep}
            onChange={setInterestRate}
            formatValue={(v) => `${v.toFixed(1)}% p.a.`}
            id="emi-interest-rate"
          />
        </div>
      </div>

      {/* 4. Real-time EMI Breakdown */}
      <EmiBreakdown result={result} interestRate={interestRate} tenure={tenureInMonths} />

      {showApplyButton && (
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => navigate('/apply')}
          aria-label={`Apply for loan of ${formatINR(loanAmount)}`}
        >
          Apply for This Loan
        </Button>
      )}
    </div>
  );
}
