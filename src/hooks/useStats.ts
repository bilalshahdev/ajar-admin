// useStats

import { getStats } from "@/services/stats";
import { useQuery } from "@tanstack/react-query";

export const useStats = (filter: "week" | "month" | "year") => {
  return useQuery({
    queryKey: ["stats", filter],
    queryFn: () => getStats(filter),
    refetchOnWindowFocus: false,
    refetchInterval: 60 * 60 * 1000,
  });
};
