// components/fields/rhf-switch.tsx
"use client";
import { Controller, Control } from "react-hook-form";
import { Switch as SwitchUI } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SwitchProps {
  control: Control<any>;
  name: string;
  label: string;
}
const Switch = ({ control, name, label }: SwitchProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={name}>{label}</Label>
        <SwitchUI
          checked={field.value}
          onCheckedChange={field.onChange}
          id={name}
        />
      </div>
    )}
  />
);
export default Switch;
