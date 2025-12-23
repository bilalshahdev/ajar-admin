"use client";

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

// DND Kit imports
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
    () =>
      selectedValues
        .map((val) => options.find((o) => getOptionValue(o) === val))
        .filter(Boolean) as TOption[],
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

  // DnD Kit setup
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    })
  );

  return (
    <div className={cn("space-y-2", className)}>
      <Label>
        {label}{" "}
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
              ? `${selectedValues.length} item${selectedValues.length > 1 ? "s" : ""
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

      {/* Draggable badges */}
      {selectedOptions.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(event) => {
            const { active, over } = event;
            if (over && active.id !== over.id) {
              const oldIndex = selectedValues.indexOf(active.id as string);
              const newIndex = selectedValues.indexOf(over.id as string);
              const newOrder = arrayMove(selectedValues, oldIndex, newIndex);
              field.onChange(newOrder); // updates order in form state
            }
          }}

        >
          <SortableContext
            items={selectedValues}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedOptions.map((opt) => {
                const value = getOptionValue(opt);
                const label = getOptionLabel(opt);
                return (
                  <SortableBadge
                    key={value}
                    id={value}
                    label={label}
                    remove={remove}
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

// Sortable Badge component
type SortableBadgeProps = {
  id: string;
  label: string;
  remove: (value: string) => void;
};

const SortableBadge = ({ id, label, remove }: SortableBadgeProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Badge variant="secondary" className="flex items-center gap-1 cursor-grab">
        {label}
        <X
          className="w-3 h-3 cursor-pointer text-red-500"
          onClick={() => remove(id)}
        />
      </Badge>
    </div>

  );
};

export default MultiSelect;
