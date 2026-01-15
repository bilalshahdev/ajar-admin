"use client";

import { Change, IndicatorLabel } from "@/types";
import { roundOffValue } from "@/utils/roundOffValue";
import Link from "next/link";

const StatsCard = ({
  label,
  value,
  icon,
  change,
  bgColor,
  path,
  format,
}: {
  label: string | IndicatorLabel;
  value: string | number;
  icon?: React.ReactNode;
  change?: Change;
  bgColor?: string;
  path?: string;
  format?: {
    decimals?: number;
    currency?: boolean;
    compact?: boolean;
  };
}) => {
  const cardContent = (
    <div className="p-4 bg-card rounded-lg shadow hover:shadow-lg flex items-center justify-between transition-all">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <h3 className="text-lg font-semibold">
          {roundOffValue(value, format)}
        </h3>
      </div>

      {icon && (
        <div className={`p-3 rounded-full text-white ${bgColor}`}>{icon}</div>
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

  if (path) {
    return <Link href={path}>{cardContent}</Link>;
  }

  return cardContent;
};

export default StatsCard;
