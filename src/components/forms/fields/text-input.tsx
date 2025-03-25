import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { useController } from "react-hook-form";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  note?: string;
  control: any;
  name: string;
  type?: "text" | "email" | "number";
  icon?: React.ReactNode; // Icon prop
}

const TextInput = ({
  label,
  note,
  control,
  name,
  type,
  icon,
  ...props
}: TextInputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    field.onChange(type === "number" ? Number(value) || 0 : value);
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label className="capitalize">
          {label}{" "}
          <span className="text-muted-foreground text-xs normal-case">
            {note && `(${note})`}
          </span>
        </Label>
      )}

      <div className="relative flex items-center">
        <Input
          {...field}
          {...props}
          type={type}
          className={`bg-secondary/50 pr-12 ${
            error ? "border-red-500 focus:ring-red-500" : ""
          }`}
          onChange={handleChange}
        />
        {icon && (
          <Button
            size="icon"
            type="button"
            className="absolute inset-y-0 right-0 flex items-center justify-center rounded-md"
          >
            {icon}
          </Button>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default TextInput;
