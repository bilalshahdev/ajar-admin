import { cn } from "@/lib/utils";
import { cloneElement, ReactElement, SVGProps } from "react";

interface GradientIconProps extends SVGProps<SVGSVGElement> {
  icon: ReactElement<SVGProps<SVGSVGElement>>;
}

const GradientIcon = ({ icon, ...props }: GradientIconProps) => {
  const gradientId = "gradientId";
  return (
    <svg width={24} height={24} {...props}>
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
