export const roundOffValue = (
  value: string | number,
  options?: {
    decimals?: number;
    currency?: boolean;
    compact?: boolean;
  }
) => {
  if (typeof value === "string") return value;

  const {
    decimals = 2,
    currency = false,
    compact = false,
  } = options || {};

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: currency ? decimals : 0,
    maximumFractionDigits: decimals,
    notation: compact ? "compact" : "standard",
  }).format(value);
};
