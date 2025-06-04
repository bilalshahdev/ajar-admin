import { cn } from "@/lib/utils";

interface MyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  scale?: number;
}

const MyCard = ({
  children,
  className,
  scale = 1.03,
  ...props
}: MyCardProps) => {
  const hoverStyle = {
    "--tw-hover-scale-x": scale.toString(),
    "--tw-hover-scale-y": scale.toString(),
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        `border-2 rounded p-4 shadow hover:shadow-lg transition duration-300 cursor-pointer overflow-hidden`,
        `hover:scale-[var(--tw-hover-scale-x),var(--tw-hover-scale-y)]`, // Using CSS variables
        className
      )}
      style={hoverStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default MyCard;
