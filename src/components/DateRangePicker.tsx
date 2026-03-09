// add this import at top
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";

// add this component above Users component
export default function DateRangePicker({
    fromDate,
    toDate,
    onFromChange,
    onToChange,
}: {
    fromDate?: string;
    toDate?: string;
    onFromChange: (val: string | undefined) => void;
    onToChange: (val: string | undefined) => void;
}) {
    const t = useTranslations();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Local state to hold values before clicking "Apply"
    const [tempFrom, setTempFrom] = useState(fromDate);
    const [tempTo, setTempTo] = useState(toDate);

    // Sync local state if props change externally (like clearing)
    useEffect(() => {
        setTempFrom(fromDate);
        setTempTo(toDate);
    }, [fromDate, toDate]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleApply = () => {
        onFromChange(tempFrom);
        onToChange(tempTo);
        setOpen(false);
    };

    const handleClear = () => {
        setTempFrom(undefined);
        setTempTo(undefined);
        onFromChange(undefined);
        onToChange(undefined);
        setOpen(false);
    };

    const hasValue = fromDate || toDate;

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={cn(
                    "flex items-center gap-2 border rounded-md px-3 h-9 text-sm whitespace-nowrap transition-colors",
                    hasValue
                        ? "border-primary bg-primary/5 text-primary font-medium"
                        : "border-input bg-background text-muted-foreground hover:bg-accent"
                )}
            >
                <FiCalendar size={15} />
                {hasValue
                    ? `${fromDate ?? "..."} → ${toDate ?? "..."}`
                    : t("translation.documentDate")}
            </button>

            {open && (
                <div className="absolute top-11 right-0 z-50 bg-white border rounded-lg shadow-xl p-4 flex flex-col gap-4 w-[280px] animate-in fade-in zoom-in duration-150">
                    <div className="space-y-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-[11px] uppercase font-semibold text-muted-foreground tracking-wider">
                                {t("translation.fromDate")}
                            </label>
                            <input
                                type="date"
                                className="border rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                value={tempFrom ?? ""}
                                onChange={(e) => setTempFrom(e.target.value || undefined)}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[11px] uppercase font-semibold text-muted-foreground tracking-wider">
                                {t("translation.to")}
                            </label>
                            <input
                                type="date"
                                className="border rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                value={tempTo ?? ""}
                                onChange={(e) => setTempTo(e.target.value || undefined)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t mt-1">
                        <button
                            type="button"
                            className="text-xs text-muted-foreground hover:text-red-500 transition-colors"
                            onClick={handleClear}
                        >
                            {t("translation.clearDates")}
                        </button>

                        <button
                            type="button"
                            className="bg-primary text-white px-4 py-1.5 rounded-md text-xs font-medium hover:bg-primary/90 transition-colors"
                            onClick={handleApply}
                        >
                            {t("translation.apply")}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}