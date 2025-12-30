export const roundOffValue = (
  value: string | number,
  options?: {
    decimals?: number;
    currency?: boolean;
    compact?: boolean;
  }
) => {
  const { decimals = 2, currency = false, compact = false } = options || {};

  // Convert string to number
  const numericValue = typeof value === "number" ? value : parseFloat(value);

  // Handle invalid numbers
  if (isNaN(numericValue)) return "0";

  // Round the value properly
  const factor = Math.pow(10, decimals);
  const roundedValue = Math.round(numericValue * factor) / factor;

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: currency ? decimals : 0,
    maximumFractionDigits: decimals,
    notation: compact ? "compact" : "standard",
  }).format(roundedValue);
};
