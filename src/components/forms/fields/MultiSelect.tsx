// components/inputs/MultiSelect.tsx
import { useMemo } from "react";
import { Control, useWatch, useController, FieldPath } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Loader from "@/components/Loader";

type BaseForm = Record<string, any>;

export type MultiSelectProps<TOption, TForm extends BaseForm = BaseForm> = {
  control: Control<TForm>;
  name: FieldPath<TForm>;
  label: string;
  note?: string;
  options: TOption[];
  getOptionValue: (opt: TOption) => string;
  getOptionLabel: (opt: TOption) => string;
  loading?: boolean;
  className?: string;
  emptyText?: string;
  searchPlaceholder?: string;
};

export function MultiSelect<TOption, TForm extends BaseForm = BaseForm>({
  control,
  name,
  label,
  note,
  options,
  getOptionValue,
  getOptionLabel,
  loading,
  className,
  emptyText = "No item found.",
  searchPlaceholder = "Search...",
}: MultiSelectProps<TOption, TForm>) {
  const { field } = useController<TForm, FieldPath<TForm>>({
    control,
    name,
  });

  const rawSelectedValues: string[] = useWatch({ control, name }) || [];

  const selectedValues = rawSelectedValues;

  const selectedOptions = useMemo(
    () => options.filter((o) => selectedValues.includes(getOptionValue(o))),
    [options, selectedValues, getOptionValue]
  );

  const toggle = (value: string) => {
    if (selectedValues.includes(value)) {
      field.onChange(selectedValues.filter((v) => v !== value));
    } else {
      field.onChange([...selectedValues, value]);
    }
  };

  const remove = (value: string) => {
    field.onChange(selectedValues.filter((v) => v !== value));
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label>
        {label}
        <span className="text-muted-foreground text-xs normal-case">
          {note && `(${note})`}
        </span>
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between flex-wrap text-left min-h-[40px]",
              selectedValues.length === 0 && "text-muted-foreground"
            )}
          >
            {selectedValues.length > 0
              ? `${selectedValues.length} item${
                  selectedValues.length > 1 ? "s" : ""
                } selected`
              : "Select..."}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} className="h-9" />
            <CommandList>
              {loading ? (
                <div className="p-3">
                  <Loader />
                </div>
              ) : (
                <>
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  <CommandGroup>
                    {options.map((opt, idx) => {
                      const value = getOptionValue(opt);
                      const label = getOptionLabel(opt);
                      const isSelected = selectedValues.includes(value);
                      return (
                        <CommandItem
                          key={`${value}-${idx}`}
                          onSelect={() => toggle(value)}
                        >
                          {label}
                          {isSelected && (
                            <span className="ml-auto text-primary">✔</span>
                          )}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedOptions.map((opt, idx) => {
            const value = getOptionValue(opt);
            const label = getOptionLabel(opt);
            return (
              <Badge
                key={`${value}-${idx}`}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {label}
                <X
                  className="w-3 h-3 cursor-pointer text-red-500"
                  onClick={() => remove(value)}
                />
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MultiSelect;
