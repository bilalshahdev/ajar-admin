import { format, subDays, subWeeks, subMonths } from "date-fns";

export function getFormattedLabel(
  raw: string | number,
  filter: "week" | "month" | "year"
): string {
  const now = new Date();

  if (filter === "week") {
    const dayOffset = Number(raw);
    // Example: if raw=0 => today, raw=1 => yesterday, ... raw=6 => 6 days ago
    const date = subDays(now, 6 - dayOffset);
    return format(date, "EEE"); // Sun, Mon, Tue, etc.
  }

  if (filter === "month") {
    const weekOffset = Number(raw);
    // raw=0 => current week, raw=1 => last week, etc.
    const date = subWeeks(now, 3 - weekOffset);
    return `W${weekOffset + 1}`; // or format(date, "wo 'week'") for fancy
  }

  if (filter === "year") {
    const monthOffset = Number(raw);
    // raw=0 => current month, raw=1 => last month, etc.
    const date = subMonths(now, 11 - monthOffset);
    return format(date, "MMM"); // Jan, Feb, etc.
  }

  return raw.toString();
}
