import { cn } from "@/lib/utils";
import { cloneElement, ReactElement, SVGProps } from "react";

interface GradientIconProps {
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  className?: string;
}

const GradientIcon = ({ icon, className }: GradientIconProps) => {
  const gradientId = "gradientId";
  return (
    <svg width={24} height={24} className={cn("", className)}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={"var(--blue)"} />
          <stop offset="100%" stopColor={"var(--aqua)"} />
        </linearGradient>
      </defs>
      {cloneElement(icon, { fill: `url(#${gradientId})` })}
    </svg>
  );
};

export default GradientIcon;
