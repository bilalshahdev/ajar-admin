"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useController } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Allows alphanumeric starting with lowercase
const camelCaseRegex = /^[a-z0-9]+([A-Z0-9][a-z0-9]*)*$/;

const FormArrayInput = ({
  label,
  control,
  name,
}: {
  label?: string;
  control: any;
  name: string;
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const [value, setValue] = useState<string>(""); 
  const [items, setItems] = useState<string[]>(field.value || []); 
  const [validationError, setValidationError] = useState<string | null>(null);

  // Sync internal state with hook-form when reset via setValue from parent
  useEffect(() => {
    setItems(field.value || []);
  }, [field.value]);

  const addItem = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    event.preventDefault();

    const inputValue = value.trim();

    if (!camelCaseRegex.test(inputValue)) {
      setValidationError("Value must be camelCase (numbers allowed).");
      return;
    }

    if (!inputValue || items.includes(inputValue)) return;

    const newItems = [...items, inputValue];
    setItems(newItems);
    field.onChange(newItems);
    setValue(""); 
    setValidationError(null);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    field.onChange(newItems);
  };

  return (
    <Dialog>
      <div className="space-y-2">
        {label && <Label className="capitalize">{label}</Label>}

        <DialogTrigger asChild>
          <Button
            className={`w-full bg-secondary/50 ${error ? "border-red-500" : ""}`}
            variant="outline"
          >
            {field.value?.length > 0
              ? `${field.value?.length} ${label}`
              : `Manage ${label}`}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage {label}</DialogTitle>
          </DialogHeader>

          <Input
            placeholder={`Enter ${label?.toLowerCase()} and press Enter`}
            onKeyDown={addItem}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {validationError && (
            <span className="text-red-500 text-sm">{validationError}</span>
          )}

          <div className="space-y-2">
            {items.length > 0 ? (
              <div className="max-h-40 overflow-y-auto flex flex-wrap gap-2">
                {items.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-center gap-1 bg-secondary text-foreground px-3 py-1 rounded-lg"
                  >
                    <span className="text-sm truncate w-20 sm:w-24">
                      {item}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-xs">
                No {label?.toLowerCase()} added yet.
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default FormArrayInput;