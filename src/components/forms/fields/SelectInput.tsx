import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Controller, useController } from "react-hook-form";

interface SelectInputProps extends React.HTMLAttributes<HTMLSelectElement> {
  control: any;
  name: string;
  label?: string;
  options: any[];
  labelKey?: string;
  valueKey?: string;
  disabled?: boolean;
  loading?: boolean;
}

const SelectInput = ({
  control,
  name,
  label,
  options,
  labelKey = "label",
  valueKey = "value",
  disabled,
  className,
  loading,
}: SelectInputProps) => {
  // get the validation error too
  const {
    fieldState: { error },
  } = useController({ name, control });
  return (
    <div className={cn(label ? "space-y-2" : "", className)}>
      {label && <Label>{label}</Label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={disabled}
            >
              <SelectTrigger disabled={loading} className="w-full">
                <SelectValue
                  placeholder={loading ? "Loading..." : `Select ${label}`}
                />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt: any) => (
                  <SelectItem key={opt[valueKey]} value={opt[valueKey]}>
                    {opt[labelKey]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default SelectInput;
