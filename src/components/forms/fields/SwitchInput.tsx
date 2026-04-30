import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import React from "react";
import { useController, Control } from "react-hook-form";

interface SwitchInputProps {
  label?: string;
  note?: string;
  control: Control<any>;
  name: string;
  className?: string;
}

const SwitchInput = ({
  label,
  note,
  control,
  name,
  className,
}: SwitchInputProps) => {
  const t = useTranslations();

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

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

      <div className="flex items-center space-x-2">
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default SwitchInput;
