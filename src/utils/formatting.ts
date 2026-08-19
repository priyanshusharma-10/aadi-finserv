/**
 * Formatting utilities — Indian number system conventions
 */

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const inrFormatterDecimal = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat('en-IN');

/**
 * Format a number as INR currency with Indian separators
 * e.g. 250000 → ₹2,50,000
 */
export function formatINR(value: number): string {
  return inrFormatter.format(value);
}

/**
 * Format INR with decimals
 * e.g. 8715.5 → ₹8,715.50
 */
export function formatINRDecimal(value: number): string {
  return inrFormatterDecimal.format(value);
}

/**
 * Format as plain Indian number without currency symbol
 * e.g. 250000 → 2,50,000
 */
export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/**
 * Format a percentage value
 * e.g. 10.5 → 10.5%
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a date string to Indian locale
 * e.g. "2024-01-15" → "15 Jan 2024"
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

/**
 * Format a phone number as Indian mobile
 * e.g. "9876543210" → "+91 98765 43210"
 */
export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return phone;
}

/**
 * Format file size
 * e.g. 1048576 → "1.0 MB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Truncate a string with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 3)}...`;
}

/**
 * Generate a random application reference number
 */
export function generateApplicationId(): string {
  const prefix = 'SF';
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `${prefix}${year}${random}`;
}
