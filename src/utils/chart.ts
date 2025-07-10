export function calculateTrend<
  T extends Record<string, any>,
  K extends keyof T
>(
  data: T[],
  dataKey: K
): {
  trend: number;
  isUp: boolean;
  label: string;
} {
  if (!data || data.length < 2) {
    return { trend: 0, isUp: true, label: "No data" };
  }

  const current = data[data.length - 1][dataKey] as number;
  const previous = data[data.length - 2][dataKey] as number;

  const diff = current - previous;
  const percentChange = previous !== 0 ? (diff / previous) * 100 : 0;
  const rounded = Math.abs(+percentChange.toFixed(2));
  const isUp = percentChange >= 0;

  return {
    trend: rounded,
    isUp,
    label: isUp
      ? `📈 Trending up by ${rounded}%`
      : `📉 Trending down by ${rounded}%`,
  };
}
