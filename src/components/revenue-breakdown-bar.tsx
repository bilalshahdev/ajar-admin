"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";

const data = [
  { name: "Commission", value: 30 },
  { name: "Owner payout", value: 80 },
  { name: "Refund", value: 80 }, // 🔥 This is the one to highlight
];

const highlightIndex = data.findIndex((item) => item.name === "Refund");

export default function RevenueBreakdownBar() {
  return (
    <Card>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <div>
            <h4 className="text-md font-semibold">Revenue Breakdown</h4>
            <p className="text-xs text-muted-foreground">Overall Insight</p>
          </div>
          <span className="text-sm text-muted-foreground">
            Sort by:{" "}
            <span className="text-emerald-500 font-medium">Monthly</span>
          </span>
        </div>

        {/* Chart Section */}
        <div className="relative h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, bottom: 10, left: 10 }}
              barSize={32}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip />

              <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#34d399">
                <LabelList
                  content={({ x, y, width, height, index }) => {
                    if (index !== highlightIndex) return null;

                    return (
                      <foreignObject
                        x={(x as number) - 24}
                        y={(y as number) - 50}
                        width={90}
                        height={40}
                      >
                        <div className="bg-emerald-500 text-white text-xs rounded-md px-2 py-1 shadow text-center">
                          +6.08% 🚀
                          <div className="font-semibold text-base">$2.80M</div>
                        </div>
                      </foreignObject>
                    );
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
