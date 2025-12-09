"use client";

import { Change, IndicatorLabel } from "@/types";

const StatsCard = ({
  label,
  value,
  icon,
  change,
  bgColor,
}: {
  label: string | IndicatorLabel;
  value: string | number;
  icon?: React.ReactNode;
  change?: Change;
  bgColor?: string;
}) => {
  return (
    <div
      key={label}
      className={`p-4 bg-card rounded-lg shadow dark:shadow-muted flex items-center justify-between`}
    >
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <h3 className="text-lg font-semibold">{value}</h3>
      </div>
      {icon && (
        <div className={`p-4 rounded-full text-white ${bgColor}`}>{icon}</div>
      )}
      {change && (
        <p className="text-sm font-semibold">
          {change.trend === "up" ? (
            <span className="text-green-500">+{change.value}%</span>
          ) : (
            <span className="text-red-500">-{change.value}%</span>
          )}
        </p>
      )}
    </div>
  );
};

export default StatsCard;
