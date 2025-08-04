import { cn } from "@/lib/utils";

const ResponseError = ({
  error,
  className,
}: {
  error: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex h-full items-center justify-center",
        className
      )}
    >
      {error}
    </div>
  );
};

export default ResponseError;
