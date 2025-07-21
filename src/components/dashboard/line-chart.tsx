"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { BiLineChart } from "react-icons/bi";
import { useMemo } from "react";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { H4, Label, Small } from "../typography";
import ChartCard from "./chart-card";
import { FilterOption, userChartData } from "@/config/data";
import { calculateTrend } from "@/utils/chart";

type LineChartProps = {
  filter: FilterOption;
};

const LineChart = ({ filter }: LineChartProps) => {
  const chartData = useMemo(() => userChartData[filter], [filter]);

  const chartConfig: ChartConfig = {
    users: {
      label: "Users",
      color: "hsl(var(--chart-1))",
    },
  };
  const trendInfo = calculateTrend(chartData, "users");
  return (
    <ChartCard className="space-y-4 h-full">
      <div className="flex items-center justify-between capitalize">
        <div className="flex flex-col">
          <Small>Overview</Small>
          <H4>{filter} users</H4>
        </div>
      </div>
      <ChartCard className="bg-card border p-0">
        <Small className="flex items-center gap-2 border-b p-2 capitalize">
          <BiLineChart />
          <span>chart</span>
        </Small>
        <div className="p-4">
          <div>
            <H4>Users</H4>
            <Small>Showing {filter} users</Small>
          </div>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="users"
                type="natural"
                fill="var(--color-signature)"
                fillOpacity={0.4}
                stroke="var(--color-signature)"
              />
            </AreaChart>
          </ChartContainer>
          <div>
            <Label>{trendInfo.label}</Label>
            <Small>Period: {filter}</Small>
          </div>
        </div>
      </ChartCard>
    </ChartCard>
  );
};

export default LineChart;
