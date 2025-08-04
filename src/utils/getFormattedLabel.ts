import { format, subDays, subWeeks, subMonths } from "date-fns";

export function getFormattedLabel(
  raw: string | number,
  filter: "week" | "month" | "year"
): string {
  const now = new Date();

  if (filter === "week") {
    const dayOffset = Number(raw);
    // Assuming 0-based index: 0 = 7 days ago, 6 = today
    return `W${dayOffset + 1}`; // e.g., W1 to W7
  }

  if (filter === "month") {
    const weekOffset = Number(raw);
    const weekDate = subWeeks(now, 4 - weekOffset);
    return `W${weekOffset + 1}`; // optional: still W1–W4
  }

  if (filter === "year") {
    const monthOffset = Number(raw);
    const date = subMonths(now, 12 - monthOffset);
    return format(date, "MMMM"); // e.g., January
  }

  return raw.toString();
}
