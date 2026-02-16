"use client";

import { initialAnalyticsChartValues } from "@/config/data";
import { useAnalytics } from "@/hooks/useStats";
import { chartFilters } from "@/services/stats";
import { FilterOption, PerformanceIndicator } from "@/types";
import { useState } from "react";
import BxSelect from "../BxSelect";
import StatsCard from "../cards/StatsCard";
import ResponseError from "../ResponseError";
import RevenueBreakdownBar from "../RevenueBreakdownBar";
import RevenueLineChart from "../RevenueLineChart";
import AnalyticsSkeleton from "../skeletons/AnalyticsSkeleton";
import { toCamelCase } from "@/utils/toCamelCase";

const Analytics = () => {
  const [selectedFilter, setSelectedFilter] = useState(chartFilters[0]);
  const { data, isLoading, error } = useAnalytics(selectedFilter);

  const {
    performanceIndicators: rawStats = [],
    charts = initialAnalyticsChartValues,
    filter,
  } = data?.data || {};
  
  // Map stats to camelCase here so it flows into every component
  const stats = rawStats.map((stat) => ({
    ...stat,
    label: toCamelCase(stat.label) as PerformanceIndicator['label'],
  }));

  if (isLoading) return <AnalyticsSkeleton />;
  if (error) return <ResponseError error={error.message} />;

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-end">
        <BxSelect
          options={chartFilters}
          value={selectedFilter}
          onChange={(val) => setSelectedFilter(val as FilterOption)}
          // placeholder={t("translation.selectFilter")}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.label}
            {...stat}
          />
        ))}
      </div>

      <RevenueLineChart filter={selectedFilter} charts={charts} />
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RevenueBreakdownBar performanceIndicators={stats} />
        <RevenueCategoryPie />
      </div> */}
      <RevenueBreakdownBar performanceIndicators={stats} />
    </div>
  );
};

export default Analytics;