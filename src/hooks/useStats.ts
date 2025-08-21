// useStats

import { useQuery } from "@tanstack/react-query";
import { getStats, getAnalytics } from "@/services/stats";
import { FilterOption } from "@/types";

export const useStats = (filter: FilterOption) => {
  return useQuery({
    queryKey: ["stats", filter],
    queryFn: () => getStats(filter),
    refetchOnWindowFocus: false,
    refetchInterval: 60 * 60 * 1000,
  });
};

export const useAnalytics = (filter: FilterOption) => {
  return useQuery({
    queryKey: ["analytics", filter],
    queryFn: () => getAnalytics(),
    refetchOnWindowFocus: false,
    refetchInterval: 60 * 60 * 1000,
  });
};
