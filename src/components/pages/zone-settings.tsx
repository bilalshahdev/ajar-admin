"use client";

import { useForm, useWatch } from "react-hook-form";
import CommissionInputs from "../forms/fields/comission-inputs";
import DateInput from "../forms/fields/date-input";
import TextInput from "../forms/fields/text-input";
import Loader from "../loader";
import { Button } from "../ui/button";
import SubCategorySelector from "../subcategory-selector";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { ChevronsUpDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

const dummyFields = [
  { _id: "64a1", label: "Area" },
  { _id: "64a2", label: "Size" },
  { _id: "64a3", label: "Color" },
  { _id: "64a4", label: "Location" },
  { _id: "64a5", label: "Brand" },
];

const ZoneSettings = () => {
  const defaultValues = {
    zone: "",
    subcategory: "",
    fields: [],
    name: "",
    description: "",
    settings: {
      commissionType: "percentage",
      leaserCommission: {
        value: 0,
        min: 0,
        max: 0,
      },
      renterCommission: {
        value: 0,
        min: 0,
        max: 0,
      },
      tax: 0,
      expiry: "",
    },
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ defaultValues });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <SubCategorySelector control={control} name="subcategory" />
      <SubcategorySettingsForm
        control={control}
        isSubmitting={isSubmitting}
        setValue={setValue}
      />
    </form>
  );
};

export default ZoneSettings;

const SubcategorySettingsForm = ({
  control,
  isSubmitting,
  setValue,
}: {
  control: any;
  isSubmitting: boolean;
  setValue: any;
}) => {
  const subcategory = useWatch({
    control,
    name: "subcategory",
  });
  const selected = useWatch({
    control,
    name: "subcategory",
  });

  const selectedFields = useWatch({ control, name: "fields" }) || [];

  const handleAddField = (id: string) => {
    if (!selectedFields.includes(id as never)) {
      setValue("fields", [...selectedFields, id as never]);
    }
  };

  const handleRemoveField = (id: string) => {
    setValue(
      "fields",
      selectedFields.filter((fieldId: string) => fieldId !== id)
    );
  };
  return (
    <>
      {subcategory && selected.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label>Select Custom Fields</Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between flex-wrap text-left min-h-[40px]",
                      selectedFields.length === 0 && "text-muted-foreground"
                    )}
                  >
                    {selectedFields.length > 0
                      ? dummyFields
                          .filter((f) => selectedFields.includes(f._id))
                          .map((f) => f.label)
                          .join(", ")
                      : "Select fields..."}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search fields..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No field found.</CommandEmpty>
                      <CommandGroup>
                        {dummyFields.map((field) => {
                          const isSelected = selectedFields.includes(field._id);
                          return (
                            <CommandItem
                              key={field._id}
                              onSelect={() => {
                                if (isSelected) {
                                  handleRemoveField(field._id);
                                } else {
                                  handleAddField(field._id);
                                }
                              }}
                            >
                              {field.label}
                              {isSelected && (
                                <span className="ml-auto text-primary">✔</span>
                              )}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {selectedFields.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {dummyFields
                    .filter((f) => selectedFields.includes(f._id))
                    .map((field) => (
                      <Badge
                        key={field._id}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        {field.label}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => handleRemoveField(field._id)}
                        />
                      </Badge>
                    ))}
                </div>
              )}
            </div>

            <CommissionInputs control={control} className="col-span-2" />
            <DateInput
              control={control}
              name="settings.expiry"
              label="Expiry"
              note="to Accept the request"
            />
            <div className="col-span-2 md:col-span-1">
              <TextInput
                control={control}
                name="settings.tax"
                type="number"
                label="Tax"
                note="Tax percentage"
              />
            </div>
          </div>
          <Button variant="button" disabled={isSubmitting} type="submit">
            {isSubmitting ? <Loader /> : "Submit"}
          </Button>
        </>
      ) : (
        <p className="text-muted-foreground">
          Please select a subcategory for its settings
        </p>
      )}
    </>
  );
};
