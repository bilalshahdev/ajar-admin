// types/stats.ts

export interface Stats {
  totalUsers: number;
  totalAdmins: number;
  totalNormalUsers: number;
  totalLeasers: number;
  totalMarketplaceListings: number;
  totalCategories: number;
  totalZones: number;
  bookingCount: number;
  totalEarning: number;
}

export type Trend = "up" | "down";

export interface Change {
  value: number;
  trend: Trend;
}

export interface UsersRecord {
  value: string;
  totalUsers: string;
}

export interface EarningsRecord {
  value: string;
  totalEarning: string;
}

export interface UsersChartRecord {
  change: Change;
  record: UsersRecord[];
}

export interface EarningsChartRecord {
  change: Change;
  record: EarningsRecord[];
}

export interface Charts {
  users: UsersChartRecord;
  earnings: EarningsChartRecord;
}

export interface StatsResponse {
  success: boolean;
  message: string;
  data: {
    filter: "week" | "month" | "year";
    stats: Stats;
    charts: Charts;
  };
}
export type FilterOption = "week" | "month" | "year";

import { api } from "@/lib/axios";

export const chartFilters: FilterOption[] = ["week", "month", "year"];

export const getStats = async (
  filter: FilterOption
): Promise<StatsResponse> => {
  const response = await api.get(`/users/stats?filter=${filter}`);
  return response.data;
};
