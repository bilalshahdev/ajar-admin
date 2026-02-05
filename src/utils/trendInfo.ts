import { Change } from "@/types";

type TranslateFn = (key: string, values?: Record<string, any>) => string;

const getTrendInfo = (change: Change, t: TranslateFn) => {
  const value = change.value;
  const trend = change.trend;

  if (trend === "up") {
    return {
      message: `📈 ${t("translation.trendingUpBy", { value })}`,
      icon: "📈",
      isUp: true,
    };
  }

  if (trend === "down") {
    return {
      message: `📉 ${t("translation.trendingDownBy", { value })}`,
      icon: "📉",
      isUp: false,
    };
  }

  return {
    message: `➖ ${t("translation.noSignificantChange")}`,
      icon: "➖",
      isUp: null,
  };
};

export default getTrendInfo;
