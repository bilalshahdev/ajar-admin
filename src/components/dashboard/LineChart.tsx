"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import getTrendInfo from "@/utils/trendInfo";
import { getFormattedLabel } from "@/utils/getFormattedLabel";
import { useMemo } from "react";
import { BiLineChart } from "react-icons/bi";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import ChartCard from "./ChartCard";
import { H4, Label, Small } from "../Typography";
import { FilterOption, UsersChartRecord } from "@/types";

type LineChartProps = {
  filter: FilterOption;
  users: UsersChartRecord;
};

const LineChart = ({ filter, users }: LineChartProps) => {
  const chartData = useMemo(() => users.record, [users]);

  const formattedData = chartData.map((item) => ({
    ...item,
    value: getFormattedLabel(item.value, filter),
  }));

  const chartConfig: ChartConfig = {
    users: {
      label: "Users",
      color: "hsl(var(--chart-1))",
    },
  };

  const trend = getTrendInfo(users?.change);

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
              data={formattedData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="value"
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
                dataKey="totalUsers"
                type="natural"
                fill="var(--color-signature)"
                fillOpacity={0.4}
                stroke="var(--color-signature)"
              />
            </AreaChart>
          </ChartContainer>
          <div>
            <Label>{trend.message}</Label>
            <Small>Period: {filter}</Small>
          </div>
        </div>
      </ChartCard>
    </ChartCard>
  );
};

export default LineChart;
