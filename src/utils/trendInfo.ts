import { Change } from "@/types";

const getTrendInfo = (change: Change) => {
  const value = change.value;
  const trend = change.trend;

  if (trend === "up") {
    return {
      message: `📈 Trending up by ${value}%`,
      icon: "📈",
      isUp: true,
    };
  }

  if (trend === "down") {
    return {
      message: `📉 Trending down by ${value}%`,
      icon: "📉",
      isUp: false,
    };
  }

  return {
    message: "➖ No significant change",
    icon: "➖",
    isUp: null,
  };
};

export default getTrendInfo;
