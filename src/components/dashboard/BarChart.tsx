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
import { useTranslations } from "next-intl";

type BarChartProps = {
  filter: FilterOption;
  earnings: EarningsChartRecord;
};

const BarChart = ({ filter, earnings }: BarChartProps) => {
  const t = useTranslations();
  const chartData = useMemo(() => earnings.record, [earnings]);

  const formattedData = useMemo(() => {
    return chartData.map((item) => {
      const formattedValue = getFormattedLabel(item.value, filter);
      const translationKey = formattedValue.toLowerCase().replace(" ", "");

      return {
        ...item,
        value: t(`date.${translationKey}`),
        totalEarning: Number(Number(item.totalEarning || 0).toFixed(2))
      };
    });
  }, [chartData, filter, t]);

  const chartConfig: ChartConfig = {
    earnings: {
      label: "Earnings",
      color: "hsl(var(--primary))",
    },
  };

  const trendInfo = getTrendInfo(earnings.change, t);
  return (
    <ChartCard className="space-y-4 h-full">
      <div className="flex items-center justify-between capitalize">
        <div className="flex flex-col">
          <Small>{t("translation.performance")}</Small>
          <H4>{t("translation.earningsByFilter", { value: t(`translation.${filter}`) })}</H4>
        </div>
      </div>
      <ChartCard className="bg-card border p-0">
        <Small className="flex items-center gap-2 border-b p-2 capitalize">
          <BiLineChart />
          <span>{t("translation.chart")}</span>
        </Small>
        <div className="p-4">
          <div>
            <H4>{t("translation.totalEarnings")}</H4>
            <Small>{t("translation.showingEarnings", { value: t(`translation.${filter}`) })}</Small>
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
                tickFormatter={(value) =>
                  filter === "week" ? value : value.slice(0, 3)
                }
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="totalEarning"
                name={t("translation.totalEarning")}
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
            <Small>{t("translation.period", { value: t(`translation.${filter}`) })}</Small>
          </div>
        </div>
      </ChartCard>
    </ChartCard>
  );
};

export default BarChart;
