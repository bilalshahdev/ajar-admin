"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PerformanceIndicator } from "@/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function RevenueBreakdownBar({
  performanceIndicators,
}: {
  performanceIndicators: PerformanceIndicator[];
}) {
  // show trend (change with value) with name
  // Transform data for recharts
  const data = performanceIndicators.map((item: PerformanceIndicator) => ({
    name: item.label, // only text
    value: item.value,
    trend: item.change.trend, // "up" | "down"
  }));

  return (
    <Card>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <div>
            <h4 className="text-md font-semibold">Revenue Breakdown</h4>
            <p className="text-xs text-muted-foreground">
              Performance Indicators
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="relative h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={(props: any) => {
                  const { x, y, payload } = props;
                  const item = data.find((d) => d.name === payload.value);

                  if (!item) return <g />; // 👈 return empty <g>, not null

                  const trendColor = item.trend === "up" ? "green" : "red";
                  const trendSymbol = item.trend === "up" ? "▲" : "▼";

                  return (
                    <g transform={`translate(${x},${y + 20})`}>
                      <text textAnchor="middle" fill="#666" fontSize={12}>
                        {item.name}{" "}
                        <tspan fontSize={10} fill={trendColor}>
                          ({item.value}% {trendSymbol})
                        </tspan>
                      </text>
                    </g>
                  );
                }}
              />

              <YAxis tickLine={true} axisLine={false} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload; // full data row

                    const trendColor = item.trend === "up" ? "green" : "red";
                    const trendSymbol = item.trend === "up" ? "▲" : "▼";

                    return (
                      <div className="bg-white p-2 rounded shadow text-xs">
                        <p className="font-semibold">{item.name}</p>
                        <p>Value: {item.value}</p>
                        <p style={{ color: trendColor }}>
                          Change: {item.value}% {trendSymbol}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
