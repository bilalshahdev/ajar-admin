"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AlertTriangle, Check, ChevronDown } from "lucide-react";
import { useState } from "react";

type Option = { label: string; value: string };

type FilterButtonProps = {
  label: string;
  options: Option[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  isMultiple?: boolean;
  alertText?: string;
  align?: "start" | "center" | "end";
};

export const FilterButton = ({
  label,
  options,
  value,
  onChange,
  isMultiple = false,
  alertText = "You can select multiple values.",
  align = "start",
}: FilterButtonProps) => {
  const [open, setOpen] = useState(false);

  const isSelected = (val: string) =>
    Array.isArray(value) ? value.includes(val) : value === val;

  const handleSelect = (val: string) => {
    if (!isMultiple) {
      onChange(val);
      setOpen(false);
    } else {
      const current = Array.isArray(value) ? [...value] : [];
      if (current.includes(val)) {
        onChange(current.filter((v) => v !== val));
      } else {
        onChange([...current, val]);
      }
    }
  };

  const selectedLabel = () => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return label;
    }

    return Array.isArray(value)
      ? `${value.length} selected`
      : options.find((opt) => opt.value === value)?.label || label;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="min-w-[150px] justify-between">
          {selectedLabel()}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0" align="start">
        <Command>
          {isMultiple && (
            <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="w-3 h-3" />
              {alertText}
            </div>
          )}
          <CommandGroup>
            {options.map((opt) => (
              <CommandItem
                key={opt.value}
                onSelect={() => handleSelect(opt.value)}
              >
                <span>{opt.label}</span>
                {isSelected(opt.value) && <Check className="ml-auto h-4 w-4" />}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
