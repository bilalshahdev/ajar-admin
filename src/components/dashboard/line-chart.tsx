"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { BiLineChart } from "react-icons/bi";
import { H4, Label, Small } from "../typography";
import ChartCard from "./chart-card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const LineChart = () => {
  const filters = ["all", "weekly", "monthly", "yearly"];
  const [filter, setFilter] = useState(filters[0]);
  return (
    <ChartCard className="space-y-4 h-full bg-background">
      <div className="flex items-center justify-between capitalize">
        <div className="flex flex-col">
          <Small>overview</Small>
          <H4>{filter} ADs</H4>
        </div>
        <div className="flex gap-2 text-sm">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px] capitalize">
              <SelectValue placeholder="Select a filter" />
            </SelectTrigger>
            <SelectContent className="capitalize">
              {filters.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <ChartCard className="bg-secondary border p-0">
        <Small className="flex items-center gap-2 border-b p-2 capitalize">
          <BiLineChart />
          <span>chart</span>
        </Small>
        <div className="p-4">
          <div>
            <H4>Area chart</H4>
            <Small>Showing {filter} visitors</Small>
          </div>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
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
                dataKey="desktop"
                type="natural"
                fill="var(--color-signature)"
                fillOpacity={0.4}
                stroke="var(--color-signature)"
              />
            </AreaChart>
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

export default LineChart;
