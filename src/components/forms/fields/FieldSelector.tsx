import { useFormContext, useController } from "react-hook-form";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { cn } from "@/lib/utils";
import GradientIcon from "@/components/GradientIcon";

const dummyFields = [
  { _id: "f1", label: "Property Size" },
  { _id: "f2", label: "Furnishing" },
  { _id: "f3", label: "Pet Friendly" },
  { _id: "f4", label: "Floor" },
  { _id: "f5", label: "Has Parking" },
];

const FieldsSelector = ({ index }: { index: number }) => {
  const fieldPath = `subcategories.${index}.fieldIds` as const;

  const { control, watch, setValue, getValues } = useFormContext();

  const {
    field: { value: selectedFieldIds },
  } = useController({ control, name: fieldPath });

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const availableFields = dummyFields;

  const selectedFields = availableFields.filter((f) =>
    selectedFieldIds?.includes(f._id)
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return availableFields.filter(
      (field) =>
        field.label.toLowerCase().includes(q) &&
        !selectedFieldIds.includes(field._id)
    );
  }, [query, selectedFieldIds, availableFields]);

  const addField = (fieldId: string) => {
    setValue(fieldPath, [...selectedFieldIds, fieldId]);
    setQuery("");
  };

  const removeField = (fieldId: string) => {
    setValue(
      fieldPath,
      selectedFieldIds.filter((id: string) => id !== fieldId)
    );
  };

  return (
    <div className="mt-4">
      <Label className="mb-2">Fields</Label>
      <div
        className={cn(
          "relative w-full rounded-md px-3 py-1.5 flex flex-wrap items-center gap-1 border-2 border-gray-300",
          focused ? "ring-2 ring-aqua" : "hover:ring ring-aqua"
        )}
        onClick={() => {
          setFocused(true);
          document.getElementById(`field-input-${index}`)?.focus();
        }}
      >
        {selectedFields.map((field) => (
          <Badge
            key={field._id}
            variant="secondary"
            className="flex items-center px-2 py-0.5 text-sm cursor-pointer hover:bg-blue/20"
          >
            {field.label}
            <GradientIcon
              className="ml-1"
              icon={<AiOutlineCloseCircle size={20} />}
              onClick={(e) => {
                e.stopPropagation();
                removeField(field._id);
              }}
            />
          </Badge>
        ))}

        <input
          id={`field-input-${index}`}
          className="flex-1 bg-transparent outline-none text-sm min-w-[100px]"
          placeholder="Search fields..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
        />
      </div>

      {focused && filtered.length > 0 && (
        <div className="relative z-10 w-full mt-1 border rounded-md bg-background shadow max-h-60 overflow-hidden">
          <ScrollArea className="max-h-60">
            {filtered.map((field) => (
              <div
                key={field._id}
                onMouseDown={() => addField(field._id)}
                className="cursor-pointer hover:bg-secondary px-4 py-2 text-sm"
              >
                {field.label}
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default FieldsSelector;
