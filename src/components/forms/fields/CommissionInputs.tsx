"use client";
import TextInput from "./TextInput";
import { useWatch } from "react-hook-form";
import SelectInput from "./SelectInput";
import { cn } from "@/lib/utils";

interface CommissionInputsProps extends React.HTMLAttributes<HTMLDivElement> {
  control: any;
  className?: string;
}

const CommissionInputs = ({
  control,
  className,
  ...props
}: CommissionInputsProps) => {
  const commissionType = useWatch({
    control,
    name: "setting.commissionType",
  });

  const mode: "fixed" | "percentage" =
    commissionType === "percentage" ? "percentage" : "fixed";

  return (
    <div {...props} className={cn("space-y-2", className)}>
      <div className="md:w-1/2">
        <SelectInput
          control={control}
          name="setting.commissionType"
          label="commissionType"
          options={[
            { label: "percentage", value: "percentage" },
            { label: "fixed", value: "fixed" },
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
  
  // const baseName = `${type}Commission`;
  const baseName = type === "leaser" ? "leaserCommission" : "renterCommission";

  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-sm">{label} Commission</h4>

      {mode === "fixed" ? (
        <TextInput
          placeholder="Enter fixed value"
          control={control}
          name={`setting.${baseName}.value`}
          type="number"
          label="value"
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-2">
          <TextInput
            placeholder="Enter percentage value"
            control={control}
            name={`setting.${baseName}.value`}
            type="number"
            label="percentageValue"
            note="% to be applied"
            min={0}
            max={100}
          />
          <div className="grid grid-cols-2 gap-2">
            <TextInput
              placeholder="Enter min value"
              control={control}
              name={`setting.${baseName}.min`}
              type="number"
              label="min"
              min={0}
            />
            <TextInput
              placeholder="Enter max value"
              control={control}
              name={`setting.${baseName}.max`}
              type="number"
              label="max"
              min={0}
            />
          </div>
        </div>
      )}
    </div>
  );
};
