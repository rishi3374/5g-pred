
import { ValueType } from 'recharts/types/component/DefaultTooltipContent';

// Type guards for charts
export const isNumber = (value: any): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

export const formatTooltipValue = (value: ValueType): string => {
  if (typeof value === 'number') {
    return value.toFixed(1);
  }
  return String(value);
};

export const getNumericValue = (value: ValueType): number => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

export const calculatePercentage = (value: ValueType, total: ValueType): number => {
  const numValue = getNumericValue(value);
  const numTotal = getNumericValue(total);
  
  if (numTotal === 0) return 0;
  return (numValue / numTotal) * 100;
};

export const ensureNumber = (value: ValueType): number => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    return parseFloat(value) || 0;
  }
  return 0;
};

export const formatDecimal = (value: ValueType, decimals: number = 1): string => {
  const numValue = ensureNumber(value);
  return numValue.toFixed(decimals);
};

export const getPercentChange = (current: ValueType, previous: ValueType): number => {
  const currentVal = ensureNumber(current);
  const previousVal = ensureNumber(previous);
  
  if (previousVal === 0) return 0;
  return ((currentVal - previousVal) / previousVal) * 100;
};
