import React from "react";
import { XS } from "./Typography";
import { cn } from "@/lib/utils";
import Loader from "./Loader";
import { useTranslations } from "next-intl";

const ResStatus = ({
  loading,
  error,
  className,
  text,
}: {
  loading?: boolean;
  error?: string;
  className?: string;
  text?: string;
}) => {
  const t = useTranslations();
  return (
    <div
      className={cn(
        "flex items-center justify-center h-full w-full",
        className
      )}
    >
      {loading ? (
        <XS className="text-muted-foreground">{text || <Loader />}</XS>
      ) : error ? (
        <XS className="text-red-500">{text}</XS>
      ) : (
        <XS className="text-muted-foreground">{t(`translation.${text}`)}</XS>
      )}
    </div>
  );
};

export default ResStatus;
