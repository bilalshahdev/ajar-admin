"use client";

import { useState } from "react";
import { chartFilters } from "@/config/data";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import LineChart from "@/components/dashboard/line-chart";
import BarChart from "@/components/dashboard/bar-chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterOption } from "@/config/data";

export default function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState(chartFilters[0]);

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex justify-end">
        <Select
          value={selectedFilter}
          onValueChange={(value) => setSelectedFilter(value as FilterOption)}
        >
          <SelectTrigger className="w-[180px] capitalize">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent className="capitalize">
            {chartFilters.map((filter) => (
              <SelectItem key={filter} value={filter}>
                {filter}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LineChart filter={selectedFilter} />
        <BarChart filter={selectedFilter} />
      </div>
    </div>
  );
}
