import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import React, { InputHTMLAttributes } from "react";
import { useController, Control, RegisterOptions } from "react-hook-form";

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  note?: string;
  control: Control<any>;
  name: string;
  className?: string;
  rules?: RegisterOptions;
}

const NumberInput = ({
  label,
  note,
  control,
  name,
  className,
  rules,
  ...props
}: NumberInputProps) => {
  const t = useTranslations();

  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label className="capitalize">
          {t(`translation.${label}`)}{" "}
          <span className="text-muted-foreground text-xs normal-case">
            {note && `(${note})`}
          </span>
        </Label>
      )}

      <div className="relative flex items-center">
        <Input
          {...field}
          {...props}
          type="number"
          className={`bg-secondary/50 w-full ${
            error ? "border-red-500 focus:ring-red-500" : ""
          }`}
          onChange={(e) => {
            const value = e.target.value;
            field.onChange(value === "" ? undefined : Number(value));
          }}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default NumberInput;
