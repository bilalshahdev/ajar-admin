"use client";
import { Controller, Control } from "react-hook-form";
import { InputHTMLAttributes } from "react";

interface RHFChoiceProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  control: Control<any>;
  name: string;
  label: string;
  type: "checkbox" | "radio";
  value?: string; // Needed for radio buttons
}

const RHFChoice = ({
  control,
  name,
  label,
  type,
  value,
  ...rest
}: RHFChoiceProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => {
      const isChecked =
        type === "checkbox" ? field.value : field.value === value;

      return (
        <div className="flex items-center space-x-2">
          <input
            id={`${name}-${value || "option"}`}
            type={type}
            checked={isChecked}
            onChange={(e) => {
              const newValue = type === "checkbox" ? e.target.checked : value;
              field.onChange(newValue);
            }}
            value={value}
            {...rest}
          />
          <label
            htmlFor={`${name}-${value || "option"}`}
            className="text-sm font-medium"
          >
            {label}
          </label>
        </div>
      );
    }}
  />
);

export default RHFChoice;
