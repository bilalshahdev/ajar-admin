"use client";
import { BiLineChart } from "react-icons/bi";
import { H4, Label, Small } from "../typography";
import ChartCard from "./chart-card";

import {
  Bar,
  CartesianGrid,
  LabelList,
  BarChart as RechartsBarChart,
  XAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Chart data (same as your screenshot)
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

// Signature color config
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--primary))", // Use your brand primary color
  },
} satisfies ChartConfig;

const BarChart = () => {
  return (
    <ChartCard className="space-y-4 h-full">
      <div className="flex items-center justify-between capitalize">
        <div className="flex flex-col">
          <Small>performance</Small>
          <H4>Total ADs</H4>
        </div>
      </div>
      <ChartCard className="bg-background border p-0">
        <Small className="flex items-center gap-2 border-b p-2 capitalize">
          <BiLineChart />
          <span>chart</span>
        </Small>
        <div className="p-4">
          <div>
            <H4>Bar chart</H4>
            <Small>Showing total visitors</Small>
          </div>
          <ChartContainer config={chartConfig}>
            <RechartsBarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
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
              <Bar dataKey="desktop" fill="var(--color-signature)" radius={8}>
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
            <Label>Trending up by 12%</Label>
            <Small>jan - may</Small>
          </div>
        </div>
      </ChartCard>
    </ChartCard>
  );
};

export default BarChart;
