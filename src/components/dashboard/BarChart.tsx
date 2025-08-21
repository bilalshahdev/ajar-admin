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
import {
  Bar,
  CartesianGrid,
  LabelList,
  BarChart as RechartsBarChart,
  XAxis,
} from "recharts";
import { H4, Label, Small } from "../Typography";
import ChartCard from "./ChartCard";
import { FilterOption, EarningsChartRecord } from "@/types";

type BarChartProps = {
  filter: FilterOption;
  earnings: EarningsChartRecord;
};

const BarChart = ({ filter, earnings }: BarChartProps) => {
  const chartData = useMemo(() => earnings.record, [earnings]);
  const formattedData = chartData.map((item) => ({
    ...item,
    value: getFormattedLabel(item.value, filter),
  }));

  const chartConfig: ChartConfig = {
    earnings: {
      label: "Earnings",
      color: "hsl(var(--primary))",
    },
  };
  const trendInfo = getTrendInfo(earnings.change);
  return (
    <ChartCard className="space-y-4 h-full">
      <div className="flex items-center justify-between capitalize">
        <div className="flex flex-col">
          <Small>Performance</Small>
          <H4>{filter} earnings</H4>
        </div>
      </div>
      <ChartCard className="bg-card border p-0">
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
              data={formattedData}
              margin={{ top: 20 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="value"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="totalEarning"
                fill="var(--color-signature)"
                radius={8}
              >
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
            <Label>{trendInfo.message}</Label>
            <Small>Period: {filter}</Small>
          </div>
        </div>
      </ChartCard>
    </ChartCard>
  );
};

export default BarChart;
