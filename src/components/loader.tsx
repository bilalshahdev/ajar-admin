import { cn } from "@/lib/utils";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full h-4 w-4 border-foreground border-t-2 border-b-2",
        className
      )}
    />
  );
};

export default Loader;
