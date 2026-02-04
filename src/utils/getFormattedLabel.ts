import { FilterOption } from "@/types";

export const getFormattedLabel = (value: string, filter: FilterOption): string => {
  if (filter === "week") {
    // value is in format "YYYY-MM-DD"
    const date = new Date(value + 'T00:00:00Z'); // Parse as UTC
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getUTCDay()];
  }

if (filter === "month") {
    const now = new Date();
    const valueDate = new Date(value + 'T00:00:00Z');
    const startDate = new Date(Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 27,
      0, 0, 0, 0
    ));
    
    const weekNumber = Math.floor((valueDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
    return `Week ${weekNumber}`;
  }
  if (filter === "year") {
    // value is in format "YYYY-MM"
    const [year, month] = value.split('-');
    const date = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, 1));
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[date.getUTCMonth()];
  }

  return value;
};

// import { format, subDays, subWeeks, subMonths } from "date-fns";

// export function getFormattedLabel(
//   raw: string | number,
//   filter: "week" | "month" | "year"
// ): string {
//   const now = new Date();

//   if (filter === "week") {
//     const dayOffset = Number(raw);
//     // Example: if raw=0 => today, raw=1 => yesterday, ... raw=6 => 6 days ago
//     const date = subDays(now, 6 - dayOffset);
//     return format(date, "EEE"); // Sun, Mon, Tue, etc.
//   }

//   if (filter === "month") {
//     const weekOffset = Number(raw);
//     const date = subWeeks(now, 3 - weekOffset);
//     return `W${weekOffset + 1}`;
//   }

//   if (filter === "year") {
//     const monthOffset = Number(raw);
//     // raw=0 => current month, raw=1 => last month, etc.
//     const date = subMonths(now, 11 - monthOffset);
//     return format(date, "MMM"); // Jan, Feb, etc.
//   }

//   return raw.toString();
// }
