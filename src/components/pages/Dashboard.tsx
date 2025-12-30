"use client";

import { useState } from "react";
import LineChart from "@/components/dashboard/LineChart";
import BarChart from "@/components/dashboard/BarChart";
import { useStats } from "@/hooks/useStats";
import StatsSkeleton from "@/components/skeletons/StatsSkeleton";
import LineChartSkeleton from "@/components/skeletons/LineChartSkeleton";
import BarChartSkeleton from "@/components/skeletons/BarChartSkeleton";
import { chartFilters } from "@/services/stats";
import ResponseError from "@/components/ResponseError";
import DashboardStats from "../dashboard/DashboardStats";
import { FilterOption } from "@/types";
import BxSelect from "../BxSelect";

export default function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState(chartFilters[0]);
  const { data, isLoading, error } = useStats(selectedFilter);

  const { stats, charts } = data?.data || {};
  const { users, earnings } = charts || {};

  if (error) {
    return <ResponseError error={error.message} />;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex justify-end">
        <BxSelect
          options={chartFilters}
          value={selectedFilter}
          onChange={(val) => setSelectedFilter(val as FilterOption)}
          placeholder="Select filter"
        />
      </div>
      {stats && !isLoading ? (
        <DashboardStats stats={stats} />
      ) : (
        <StatsSkeleton />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users && earnings ? (
          <>
            <LineChart users={users} filter={selectedFilter} />
            <BarChart earnings={earnings} filter={selectedFilter} />
          </>
        ) : (
          <>
            <LineChartSkeleton />
            <BarChartSkeleton />
          </>
        )}
      </div>
    </div>
  );
}
