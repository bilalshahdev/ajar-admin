import { cn } from "@/lib/utils";

const H1 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("text-3xl font-bold", className)}>{children}</div>;
};

const H2 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("text-2xl font-bold", className)}>{children}</div>;
};

const H3 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("text-xl font-semibold", className)}>{children}</div>
  );
};

const H4 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("text-lg font-semibold", className)}>{children}</div>
  );
};

const P = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("", className)}>{children}</div>;
};

const Label = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("font-medium", className)}>{children}</div>;
};

const Small = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("text-sm", className)}>
      {children}
    </div>
  );
};

const XS = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("text-xs text-muted-foreground", className)}>
      {children}
    </div>
  );
};

export { H1, H2, H3, H4, P, Label, Small, XS };
