// components/fields/rhf-switch.tsx
"use client";
import { Controller, Control, useController } from "react-hook-form";
import { Switch as SwitchUI } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SwitchProps {
  control: Control<any>;
  name: string;
  label: string;
  className?: string;
}
const Switch = ({ control, name, label, className }: SwitchProps) => {
  const {
    fieldState: { error },
  } = useController({ name, control });
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={cn("flex items-center gap-2", className)}>
          <Label htmlFor={name}>{label}</Label>
          <SwitchUI
            checked={field.value}
            onCheckedChange={field.onChange}
            id={name}
          />
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )}
    />
  );
};
export default Switch;
