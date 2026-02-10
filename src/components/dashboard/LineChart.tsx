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
import { useTranslations } from "next-intl";

type LineChartProps = {
  filter: FilterOption;
  users: UsersChartRecord;
};

const LineChart = ({ filter, users }: LineChartProps) => {
  const t = useTranslations();

  const chartData = useMemo(() => users.record, [users]);

  const formattedData = useMemo(() => {
    return chartData.map((item) => {
      const formattedValue = getFormattedLabel(item.value, filter);
      const translationKey = formattedValue.toLowerCase().replace(" ", "");
      
      return {
        ...item,
        value: t(`date.${translationKey}`),
      };
    });
  }, [chartData, filter, t]);

  const chartConfig: ChartConfig = {
    users: {
      label: "Users",
      color: "hsl(var(--chart-1))",
    },
  };

  const trend = getTrendInfo(users?.change, t);

  return (
    <ChartCard className="space-y-4 h-full">
      <div className="flex items-center justify-between capitalize">
        <div className="flex flex-col">
          <Small>{t("translation.overview")}</Small>
          <H4>
            {t("translation.usersByFilter", {
              value: t(`translation.${filter}`)
            })}
          </H4>
        </div>
      </div>
      <ChartCard className="bg-card border p-0">
        <Small className="flex items-center gap-2 border-b p-2 capitalize">
          <BiLineChart />
          <span>{t("translation.chart")}</span>
        </Small>
        <div className="p-4">
          <div>
            <H4>{t("translation.users")}</H4>
            <Small>{t("translation.showingUsers", { value: t(`translation.${filter}`) })}</Small>
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
                tickFormatter={(value) =>
                  filter === "week" ? value : value.slice(0, 3)
                }
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="totalUsers"
                name={t("translation.totalUsers")}
                type="natural"
                fill="var(--color-signature)"
                fillOpacity={0.4}
                stroke="var(--color-signature)"
              />
            </AreaChart>
          </ChartContainer>
          <div>
            <Label>{trend.message}</Label>
            <Small>{t("translation.period", { value: t(`translation.${filter}`) })}</Small>
          </div>
        </div>
      </ChartCard>
    </ChartCard>
  );
};

export default LineChart;
