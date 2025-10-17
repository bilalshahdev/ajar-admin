"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "./ui/separator";

const data = [
  { name: "Apartment", value: 50000 },
  { name: "Hotels", value: 25000 },
  { name: "Rooms", value: 15000 },
  { name: "Vehicle", value: 7000 },
];

const COLORS = ["#60a5fa", "#34d399", "#f87171", "#fbbf24"];

const total = data.reduce((sum, d) => sum + d.value, 0);

export default function RevenueCategoryPie() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 mb-4">
          <h4 className="text-md font-semibold">Title</h4>
          <div className="flex gap-2">
            <span className="text-muted-foreground text-sm border rounded px-2 py-1">
              Metric
            </span>
            <span className="text-muted-foreground text-sm border rounded px-2 py-1">
              Today
            </span>
          </div>
        </div>
        <Separator />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="relative w-full sm:w-1/2 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  stroke="none"
                  isAnimationActive={false}
                  labelLine={false}
                  startAngle={90}
                  endAngle={450}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Inner content in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-bold">
                {data.length * 123}
              </span>
              <span className="text-xs text-muted-foreground">
                ${total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Right side legend */}
          <div className="space-y-1 text-sm w-full sm:w-1/2">
            {data.map((entry, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  {entry.name}
                </span>
                <span className="font-medium">
                  ${entry.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
