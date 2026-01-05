import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";

interface SelectInputProps {
  control?: any;
  name?: string;

  value?: any;
  onChange?: (value: any) => void;

  label?: string;
  options: any[];
  labelKey?: string;
  valueKey?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  isClearable?: boolean;
}

const SelectInput = ({
  control,
  name,
  value,
  onChange,
  label,
  options,
  labelKey = "label",
  valueKey = "value",
  disabled,
  className,
  loading,
  isClearable = false,
}: SelectInputProps) => {
  const isFormMode = !!control && !!name;

  const customTheme = (theme: any) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: "var(--blue)",
      primary: "var(--aqua)",
      neutral0: "var(--background)",
      neutral80: "var(--foreground)",
    },
  });

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor:
        "color-mix(in srgb, var(--secondary) 50%, transparent)",
      borderColor: state.isFocused ? "var(--blue)" : "var(--border)",
      borderRadius: "var(--radius-md)",
      height: "36px",
      minHeight: "36px",
      boxShadow: "none",
      ":hover": {
        borderColor: "var(--aqua)",
      },
    }),
  };

  const renderSelect = (currentValue: any, handleChange: any) => {
    const selectedOption = options.find(
      (opt) => opt[valueKey] === currentValue
    );

    return (
      <ReactSelect
        options={options}
        isDisabled={disabled || loading}
        isLoading={loading}
        isClearable={isClearable}
        getOptionLabel={(opt) => opt[labelKey]}
        getOptionValue={(opt) => String(opt[valueKey])}
        value={selectedOption || null}
        onChange={(val) => handleChange(val ? val[valueKey] : "")}
        placeholder={loading ? "Loading..." : `Select ${label}`}
        className="react-select-container"
        classNamePrefix="react-select"
        theme={customTheme}
        styles={customStyles}
      />
    );
  };

  return (
    <div className={cn(label ? "space-y-2" : "", className)}>
      {label && <Label>{label}</Label>}

      {isFormMode ? (
        <Controller
          name={name!}
          control={control}
          render={({ field, fieldState }) => (
            <>
              {renderSelect(field.value, field.onChange)}
              {fieldState.error && (
                <p className="text-red-500 text-sm">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      ) : (
        renderSelect(value, onChange)
      )}
    </div>
  );
};

export default SelectInput;
