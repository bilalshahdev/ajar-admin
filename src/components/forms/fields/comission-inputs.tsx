"use client";
import TextInput from "./text-input";
import { useWatch } from "react-hook-form";
import SelectInput from "./select-input";
import { cn } from "@/lib/utils";

interface CommissionInputsProps extends React.HTMLAttributes<HTMLDivElement> {
  control: any;
  className?: string;
}

const CommissionInputs = ({ control, className, ...props }: CommissionInputsProps) => {
  const commissionType = useWatch({
    control,
    name: "settings.commissionType",
  });

  const mode: "fixed" | "percentage" =
    commissionType === "percentage" ? "percentage" : "fixed";

  return (
    <div {...props} className={cn("space-y-2", className)}>
      <div className="md:w-1/2">
        <SelectInput
          control={control}
          name="settings.commissionType"
          label="Commission Type"
          options={[
            { label: "Percentage", value: "percentage" },
            { label: "Fixed", value: "fixed" },
          ]}
        />
      </div>
      <CommissionInput control={control} type="leaser" mode={mode} />
      <CommissionInput control={control} type="renter" mode={mode} />
    </div>
  );
};

export default CommissionInputs;

interface CommissionInputProps {
  control: any;
  type: "leaser" | "renter";
  mode: "fixed" | "percentage";
}

const CommissionInput: React.FC<CommissionInputProps> = ({
  control,
  type,
  mode,
}) => {
  const label = type === "leaser" ? "Leaser" : "Renter";
  const baseName = `${type}Commission`;

  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-sm">{label} Commission</h4>

      {mode === "fixed" ? (
        <TextInput
          control={control}
          name={`settings.${baseName}.value`}
          type="number"
          label="Value"
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-2">
          <TextInput
            control={control}
            name={`settings.${baseName}.value`}
            type="number"
            label="Percentage Value"
            note="This is the percentage (%) to apply"
          />
          <div className="grid grid-cols-2 gap-2">
            <TextInput
              control={control}
              name={`settings.${baseName}.min`}
              type="number"
              label="Min"
            />
            <TextInput
              control={control}
              name={`settings.${baseName}.max`}
              type="number"
              label="Max"
            />
          </div>
        </div>
      )}
    </div>
  );
};
