"use client";
import { AnalyticsCharts, FilterOption } from "@/types";
import { getFormattedLabel } from "@/utils/getFormattedLabel";
import {
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Label, Small, XS } from "./Typography";

export default function RevenueLineChart({
  charts,
  filter,
}: {
  filter: FilterOption;
  charts: AnalyticsCharts;
}) {
  const data = charts.totalRevenue.record.map((d, i) => ({
    label: getFormattedLabel(d.value, filter),
    "Total Revenue": charts.totalRevenue.record[i].amount,
    "Platform Commission": charts.platformCommission.record[i].amount,
    "Owners Payouts": charts.ownersPayouts.record[i].amount,
    "Refund Issued": charts.refundIssued.record[i].amount,
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background rounded-lg shadow-lg p-3 text-xs md:text-sm w-full">
          <p className="font-semibold mb-1">{label}</p>
          {payload.map((item: any) => (
            <p key={item.dataKey} className="flex justify-between gap-4">
              <span>{item.dataKey}</span>
              <span className="font-medium">{item.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="col-span-2 md:col-span-4">
      <ResponsiveContainer
        width="100%"
        height={300}
        className="bg-gradient-to-r from-blue to-aqua rounded-lg py-2"
      >
        <AreaChart
          data={data}
          margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="white"
            strokeOpacity={0.3}
          />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            stroke="white"
            tick={{ fontSize: 12, fill: "white", textAnchor: "middle" }}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            stroke="white"
            tick={{ fontSize: 12, fill: "white" }}
            tickMargin={10}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "rgba(255,255,255,0.3)", strokeWidth: 2 }}
          />
          <Legend />

          <Area
            type="monotone"
            dataKey="Total Revenue"
            stroke="#ffffff"
            fill="rgba(255,255,255,0.6)"
            strokeWidth={2}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="Platform Commission"
            stroke="#ffb347"
            fill="rgba(255,179,71,0.6)"
            strokeWidth={2}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="Owners Payouts"
            stroke="#90ee90"
            fill="rgba(144,238,144,0.6)"
            strokeWidth={2}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="Refund Issued"
            stroke="#ff6961"
            fill="rgba(255,105,97,0.6)"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-2 text-sm text-muted-foreground space-y-2">
        <Label>Revenue Overview</Label>
        <Small>
          <span className="text-green-600">(+15%) </span>increase in App Usage
        </Small>
      </div>
      <XS className="">updated 4 min ago</XS>
    </div>
  );
}
