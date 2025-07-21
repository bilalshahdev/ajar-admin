"use client";

import StatsCard from "../cards/stats-card";
import RevenueBreakdownBar from "../revenue-breakdown-bar";
import RevenueCategoryPie from "../revenue-category-pie";
import RevenueLineChart from "../revenue-line-chart";

const Analytics = () => {
  const stats = [
    {
      title: "Total revenue",
      value: "$2.8M",
      change: 6.08,
    },
    {
      title: "Platform commission",
      value: "$318",
      change: 6.08,
    },
    {
      title: "Owners payouts",
      value: "$2318",
      change: 6.08,
    },
    {
      title: "Refund issued",
      value: "$2318",
      change: 6.08,
    },
  ];
  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>
      <RevenueLineChart />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RevenueBreakdownBar />
        <RevenueCategoryPie />
      </div>
    </div>
  );
};

export default Analytics;
