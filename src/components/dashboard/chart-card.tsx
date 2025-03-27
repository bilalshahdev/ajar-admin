import { cn } from "@/lib/utils";

const ChartCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("shadow border rounded-lg p-4", className)}>{children}</div>
  );
};

export default ChartCard;
