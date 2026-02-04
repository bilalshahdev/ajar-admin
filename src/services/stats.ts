// types/stats.ts

export interface StatsResponse {
  success: boolean;
  message: string;
  data: {
    filter: FilterOption;
    stats: Stats;
    charts: DashboardChart;
  };
}

import { api } from "@/lib/axios";
import {
  AnalyticsResponse,
  DashboardChart,
  FilterOption,
  Stats,
} from "@/types";

export const chartFilters: FilterOption[] = ["week", "month", "year"];

export const getStats = async (
  filter: FilterOption
): Promise<StatsResponse> => {
  const response = await api.get(`/dashboard/stats?filter=${filter}`);
  return response.data;
};

export const getAnalytics = async (
  filter: FilterOption
): Promise<AnalyticsResponse> => {
  const response = await api.get(`/analytics?filter=${filter}`);
  return response.data;
};
