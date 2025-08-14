"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Label, Small, XS } from "./Typography";

const data = [
  { year: "2015", value: 5 },
  { year: "2016", value: 15 },
  { year: "2017", value: 25 },
  { year: "2018", value: 12 },
  { year: "2019", value: 23 },
  { year: "2020", value: 28 },
];

export default function RevenueLineChart() {
  return (
    <div className="col-span-2 md:col-span-4 ">
      <ResponsiveContainer
        width="100%"
        height={200}
        className="bg-gradient-to-r from-blue to-aqua rounded-lg py-2"
      >
        <LineChart
          data={data}
          margin={{ top: 20, right: 0, left: -30, bottom: 0 }} 
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="white"
            strokeOpacity={0.5}
          />
          {/* i dont wanna show the lines of x and y axis,,only data values */}
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            stroke="white"
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            stroke="white"
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "none",
              color: "#000",
            }}
            labelStyle={{ color: "#000" }}
            cursor={{ stroke: "rgba(255,255,255,0.3)", strokeWidth: 2 }}
          />
          <Line
            type="linear"
            dataKey="value"
            stroke="#fff"
            strokeWidth={2}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-2 text-sm text-muted-foreground space-y-2">
        <Label>Revenue by Category</Label>
        <Small>
          <span className="text-green-600">(+15%) </span>increase in App Usage
        </Small>
      </div>
      <XS className="">updated 4 min ago</XS>
    </div>
  );
}
