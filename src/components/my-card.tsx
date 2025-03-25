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
  return (
    <div
      className={cn(
        `border-2 rounded p-4 shadow hover:shadow-lg transition duration-300 cursor-pointer overflow-hidden`,
        `hover:scale-[${scale}]`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default MyCard;
