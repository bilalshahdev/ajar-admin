"use client";

import { initialAnalyticsChartValues } from "@/config/data";
import { useAnalytics } from "@/hooks/useStats";
import { chartFilters } from "@/services/stats";
import { AnalyticsResponse, FilterOption } from "@/types";
import { useState } from "react";
import BxSelect from "../BxSelect";
import StatsCard from "../cards/StatsCard";
import ResponseError from "../ResponseError";
import RevenueBreakdownBar from "../RevenueBreakdownBar";
import RevenueLineChart from "../RevenueLineChart";
import AnalyticsSkeleton from "../skeletons/AnalyticsSkeleton";

export const dummyAnalyticsWeek: AnalyticsResponse = {
  success: true,
  message: "Admin analytics fetched successfully",
  data: {
    filter: "week",
    performanceIndicators: [
      {
        label: "Total Revenue",
        value: 1500,
        change: {
          value: "200",
          trend: "up",
        },
      },
      {
        label: "Platform Commission",
        value: 200,
        change: {
          value: "50",
          trend: "up",
        },
      },
      {
        label: "Owners Payouts",
        value: 1300,
        change: {
          value: "150",
          trend: "up",
        },
      },
      {
        label: "Refund Issued",
        value: 20,
        change: {
          value: "5",
          trend: "down",
        },
      },
    ],
    charts: {
      totalRevenue: {
        record: [
          { value: "1", amount: 200 }, // Monday
          { value: "2", amount: 250 },
          { value: "3", amount: 180 },
          { value: "4", amount: 300 },
          { value: "5", amount: 220 },
          { value: "6", amount: 200 },
          { value: "7", amount: 150 },
        ],
      },
      platformCommission: {
        record: [
          { value: "1", amount: 0 },
          { value: "2", amount: 40 },
          { value: "3", amount: 20 },
          { value: "4", amount: 100 },
          { value: "5", amount: 40 },
          { value: "6", amount: 20 },
          { value: "7", amount: 15 },
        ],
      },
      ownersPayouts: {
        record: [
          { value: "1", amount: 0 },
          { value: "2", amount: 210 },
          { value: "3", amount: 60 },
          { value: "4", amount: 250 },
          { value: "5", amount: 195 },
          { value: "6", amount: 180 },
          { value: "7", amount: 135 },
        ],
      },
      refundIssued: {
        record: [
          { value: "1", amount: 0 },
          { value: "2", amount: 0 },
          { value: "3", amount: 5 },
          { value: "4", amount: 30 },
          { value: "5", amount: 120 },
          { value: "6", amount: 50 },
          { value: "7", amount: 0 },
        ],
      },
    },
  },
};

const Analytics = () => {
  const [selectedFilter, setSelectedFilter] = useState(chartFilters[0]);
  const { data, isLoading, error } = useAnalytics(selectedFilter);

  const {
    performanceIndicators: stats = [],
    charts = initialAnalyticsChartValues,
    filter,
  } = dummyAnalyticsWeek?.data || {};

  // const {
  //   performanceIndicators: stats = [],
  //   charts = initialAnalyticsChartValues,
  //   filter,
  // } = data?.data || {};

  if (isLoading) return <AnalyticsSkeleton />;
  if (error) return <ResponseError error={error.message} />;

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-end">
        <BxSelect
          options={chartFilters}
          value={selectedFilter}
          onChange={(val) => setSelectedFilter(val as FilterOption)}
          placeholder="Select filter"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
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
