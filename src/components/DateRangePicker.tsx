"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";

export default function DateRangePicker({
  fromDate,
  toDate,
  onFromChange,
  onToChange,
  fromLabel = "From",
  toLabel = "To",
  placeholder,
}: {
  fromDate?: string;
  toDate?: string;
  onFromChange: (val: string | undefined) => void;
  onToChange: (val: string | undefined) => void;
  fromLabel?: string;
  toLabel?: string;
  placeholder?: string;
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [localFrom, setLocalFrom] = useState<string>(fromDate ?? "");
  const [localTo, setLocalTo] = useState<string>(toDate ?? "");
  const ref = useRef<HTMLDivElement>(null);

  const today = new Date().toISOString().split("T")[0];

  // ✅ Sync local state when external props change (e.g. cleared from parent)
  useEffect(() => {
    setLocalFrom(fromDate ?? "");
  }, [fromDate]);

  useEffect(() => {
    setLocalTo(toDate ?? "");
  }, [toDate]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const hasValue = fromDate || toDate;

  const handleApply = () => {
    onFromChange(localFrom || undefined);
    onToChange(localTo || undefined);
    setOpen(false);
  };

  const handleClear = () => {
    setLocalFrom("");
    setLocalTo("");
    onFromChange(undefined);
    onToChange(undefined);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex items-center gap-2 border rounded-md px-3 h-9 text-sm whitespace-nowrap",
          hasValue ? "border-primary text-primary" : "text-muted-foreground"
        )}
      >
        <FiCalendar size={15} />
        {hasValue
          ? `${fromDate ? new Date(fromDate).toLocaleDateString("en-GB") : "..."} → ${toDate ? new Date(toDate).toLocaleDateString("en-GB") : "..."}`
          : placeholder ?? "Select Date Range"}
      </button>

      {open && (
        <div className="absolute top-11 right-0 z-50 bg-white border rounded-lg shadow-lg p-4 flex flex-col gap-3 w-[260px]">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">{fromLabel}</label>
            <input
              type="date"
              className="border rounded-md px-3 py-1.5 text-sm w-full"
              value={localFrom}
              max={today}
              onChange={(e) => setLocalFrom(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">{toLabel}</label>
            <input
              type="date"
              className="border rounded-md px-3 py-1.5 text-sm w-full"
              value={localTo}
              max={today}
              onChange={(e) => setLocalTo(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            {hasValue && (
              <button className="text-xs text-red-500" onClick={handleClear}>
                {t("translation.clearDates")}
              </button>
            )}
            <button
              onClick={handleApply}
              className="ml-auto text-xs bg-primary text-white px-3 py-1.5 rounded-md"
            >
              {t("translation.apply")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}