"use client";
const StatsCard = ({
  title,
  value,
  icon,
  change,
  bgColor,
}: {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: number;
  bgColor?: string;
}) => {
  return (
    <div
      key={title}
      className={`p-4 rounded-lg shadow dark:shadow-muted flex items-center justify-between`}
    >
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-lg font-semibold">{value}</h3>
      </div>
      {icon && (
        <div className={`p-4 rounded-full text-white ${bgColor}`}>{icon}</div>
      )}
      {change && (
        <p className="text-sm font-semibold">
          {change > 0 ? (
            <span className="text-green-500">+{change}%</span>
          ) : (
            <span className="text-red-500">-{change}%</span>
          )}
        </p>
      )}
    </div>
  );
};

export default StatsCard;
