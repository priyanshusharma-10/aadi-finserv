import { useState, useMemo } from 'react';
import { calculateEMI } from '../utils/emiCalculator';
import { loanConfig } from '../config/loanConfig';
import type { EmiResult } from '../types/loan';

export type TenureUnit = 'years' | 'months';

interface UseEmiCalculatorOptions {
  defaultAmount?: number;
  defaultTenureInMonths?: number;
  defaultRate?: number;
}

interface UseEmiCalculatorReturn {
  loanAmount: number;
  tenureValue: number;
  tenureUnit: TenureUnit;
  tenureInMonths: number;
  interestRate: number;
  result: EmiResult;
  setLoanAmount: (value: number) => void;
  setTenureValue: (value: number) => void;
  setTenureUnit: (unit: TenureUnit) => void;
  setInterestRate: (value: number) => void;
}

export function useEmiCalculator(options: UseEmiCalculatorOptions = {}): UseEmiCalculatorReturn {
  const {
    defaultAmount = loanConfig.defaultLoanAmount,
    defaultTenureInMonths = loanConfig.defaultTenure, // 24 months = 2 years
    defaultRate = loanConfig.defaultRate, // 10.5%
  } = options;

  const [loanAmount, setLoanAmount] = useState(defaultAmount);
  const [tenureUnit, setTenureUnitState] = useState<TenureUnit>('years');
  const [tenureValue, setTenureValue] = useState<number>(defaultTenureInMonths / 12); // Default 2 years
  const [interestRate, setInterestRate] = useState<number>(defaultRate);

  // Compute total tenure in months
  const tenureInMonths = useMemo(() => {
    return tenureUnit === 'years' ? Math.round(tenureValue * 12) : Math.round(tenureValue);
  }, [tenureUnit, tenureValue]);

  // Real-time EMI computation
  const result = useMemo(
    () => calculateEMI(loanAmount, interestRate, Math.max(1, tenureInMonths)),
    [loanAmount, interestRate, tenureInMonths]
  );

  // Switch between Years and Months seamlessly
  const setTenureUnit = (newUnit: TenureUnit) => {
    if (newUnit === tenureUnit) return;
    if (newUnit === 'years') {
      const years = Math.max(1, Math.min(30, Math.round(tenureValue / 12)));
      setTenureValue(years);
    } else {
      const months = Math.max(6, Math.min(360, tenureValue * 12));
      setTenureValue(months);
    }
    setTenureUnitState(newUnit);
  };

  return {
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
  };
}
