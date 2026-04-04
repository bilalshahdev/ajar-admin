"use client";

import ChartCard from "@/components/dashboard/ChartCard";
import SeasonalChartSkeleton from "@/components/skeletons/SeasonalChartSkeleton";
import { SeasonalGraphMonth } from "@/types";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Small, H4 } from "@/components/Typography";
import { BiLineChart } from "react-icons/bi";
import { useTranslations } from "next-intl";
import {
    BarChart,
    Bar,
    XAxis,
    CartesianGrid,
} from "recharts";

interface Props {
    year?: number;
    months: SeasonalGraphMonth[];
    isLoading: boolean;
}

const chartConfig: ChartConfig = {
    week1: { label: "Week 1", color: "hsl(var(--primary))" },
    week2: { label: "Week 2", color: "hsl(var(--primary))" },
    week3: { label: "Week 3", color: "hsl(var(--primary))" },
    week4: { label: "Week 4", color: "hsl(var(--primary))" },
};

export default function SeasonalBookingsChart({ year, months, isLoading }: Props) {
    const t = useTranslations("translation");
    const tDate = useTranslations("date");

    if (isLoading) return <SeasonalChartSkeleton />;
    if (!months?.length) return null;

    const chartData = months.map((m) => ({
        month: tDate(m.month.toLowerCase()),
        week1: m.weeks[0]?.totalBookings ?? 0,
        week2: m.weeks[1]?.totalBookings ?? 0,
        week3: m.weeks[2]?.totalBookings ?? 0,
        week4: m.weeks[3]?.totalBookings ?? 0,
    }));

    const totalBookings = months.reduce((s, m) => s + m.totalBookings, 0);

    return (
        <ChartCard className="w-full space-y-4">
            <div className="flex items-center justify-between capitalize">
                <div className="flex flex-col">
                    <Small>{year}</Small>
                    <H4>{t("seasonalBookings")}</H4>
                </div>
                <div className="text-right">
                    <Small>{t("totalbooking")}</Small>
                    <H4>{totalBookings}</H4>
                </div>
            </div>

            <ChartCard className="bg-card border p-0">
                <Small className="flex items-center gap-2 border-b p-2 capitalize">
                    <BiLineChart />
                    <span>{t("chart")}</span>
                </Small>

                <div className="p-4">
                    <div>
                        <H4>{t("totalBookings")}</H4>
                        <Small>{t("showingSeasonalBookings")}</Small>
                    </div>

                    <ChartContainer config={chartConfig} className="h-[280px] w-full">
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                            barCategoryGap="20%"
                            barGap={2}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent />}
                            />
                            <Bar dataKey="week1" name={tDate("week1")} fill="var(--color-signature)" radius={[4, 4, 0, 0]} opacity={1} />
                            <Bar dataKey="week2" name={tDate("week2")} fill="var(--color-signature)" radius={[4, 4, 0, 0]} opacity={0.75} />
                            <Bar dataKey="week3" name={tDate("week3")} fill="var(--color-signature)" radius={[4, 4, 0, 0]} opacity={0.55} />
                            <Bar dataKey="week4" name={tDate("week4")} fill="var(--color-signature)" radius={[4, 4, 0, 0]} opacity={0.35} />
                        </BarChart>
                    </ChartContainer>
                </div>
            </ChartCard>
        </ChartCard>
    );
}