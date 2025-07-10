"use client";

import {
  Bar,
  CartesianGrid,
  LabelList,
  BarChart as RechartsBarChart,
  XAxis,
} from "recharts";
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
import { FilterOption, earningChartData } from "@/config/data";
import { calculateTrend } from "@/utils/chart";

type BarChartProps = {
  filter: FilterOption;
};

const BarChart = ({ filter }: BarChartProps) => {
  const chartData = useMemo(() => earningChartData[filter], [filter]);

  const chartConfig: ChartConfig = {
    earnings: {
      label: "Earnings",
      color: "hsl(var(--primary))",
    },
  };
  const trendInfo = calculateTrend(chartData, "earnings");
  return (
    <ChartCard className="space-y-4 h-full bg-background">
      <div className="flex items-center justify-between capitalize">
        <div className="flex flex-col">
          <Small>Performance</Small>
          <H4>{filter} earnings</H4>
        </div>
      </div>
      <ChartCard className="bg-secondary border p-0">
        <Small className="flex items-center gap-2 border-b p-2 capitalize">
          <BiLineChart />
          <span>chart</span>
        </Small>
        <div className="p-4">
          <div>
            <H4>Total Earnings</H4>
            <Small>Showing {filter} earnings</Small>
          </div>
          <ChartContainer config={chartConfig}>
            <RechartsBarChart
              accessibilityLayer
              data={chartData}
              margin={{ top: 20 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="earnings" fill="var(--color-signature)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </RechartsBarChart>
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

export default BarChart;
