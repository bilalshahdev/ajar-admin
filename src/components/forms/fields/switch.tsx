// components/fields/rhf-switch.tsx
"use client";
import { Controller, Control } from "react-hook-form";
import { Switch as SwitchUI } from "@/components/ui/switch";

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
      <div className="flex items-center gap-2">
        <SwitchUI
          checked={field.value}
          onCheckedChange={field.onChange}
          id={name}
        />
        <label htmlFor={name}>{label}</label>
      </div>
    )}
  />
);
export default Switch;
