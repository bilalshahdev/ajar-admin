import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // utility for merging classNames
import { format } from "date-fns";
import { useController, Control } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import React, { InputHTMLAttributes } from "react";
import { useTranslations } from "next-intl";

interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  note?: string;
  control: Control<any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  note,
  control,
  name,
  placeholder = "pickADate",
  disabled = false,
  ...props
}) => {
  const t = useTranslations();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div {...props} className="space-y-2">
      {label && (
        <Label className="capitalize">
          {t(`translation.${label}`)}
          {note && (
            <span className="text-muted-foreground text-xs ml-1 normal-case">
              ({t(`translation.${note}`)})
            </span>
          )}
        </Label>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal bg-secondary/50",
              !field.value && "text-muted-foreground",
              error && "border-red-500 focus:ring-red-500"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.value ? format(field.value, "PPP") : t(`translation.${placeholder}`)}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={(date) => field.onChange(date)}
            initialFocus
            disabled={disabled}
            fromDate={new Date()}
          />
        </PopoverContent>
      </Popover>

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default DateInput;
