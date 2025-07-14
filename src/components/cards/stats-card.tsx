"use client";
const StatsCard = ({
  title,
  value,
  icon,
  bgColor,
}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
  bgColor?: string;
}) => {
  return (
    <div
      key={title}
      className={`p-4 rounded-lg shadow flex items-center justify-between`}
    >
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-lg font-semibold">{value}</h3>
      </div>
      {icon && (
        <div className={`p-4 rounded-full text-white ${bgColor}`}>{icon}</div>
      )}
    </div>
  );
};

export default StatsCard;
