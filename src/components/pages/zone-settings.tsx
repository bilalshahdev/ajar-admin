"use client";

import { useForm, useWatch } from "react-hook-form";
import CommissionInputs from "../forms/fields/comission-inputs";
import DateInput from "../forms/fields/date-input";
import TextInput from "../forms/fields/text-input";
import Loader from "../loader";
import SubCategorySelector from "../subcategory-selector";
import { Button } from "../ui/button";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetFieldsList } from "@/hooks/useFields";
import {
  useAddZoneForm,
  useGetZoneFormByZoneAndSubCategory,
  useUpdateZoneForm,
} from "@/hooks/useZoneForms";
import { cn } from "@/lib/utils";
import { Field } from "@/types";
import { ChevronsUpDown, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Label } from "../ui/label";

interface ZoneFormValues {
  zone: string;
  subCategory: string;
  fields: string[];
  name: string;
  description: string;
  setting: {
    commissionType: string;
    leaserCommission: {
      value: number;
      min: number;
      max: number;
    };
    renterCommission: {
      value: number;
      min: number;
      max: number;
    };
    tax: number;
    expiry: string;
  };
}

const ZoneSettings = () => {
  const zoneId = useParams().id;
  const [subCategory, setSubCategory] = useState<string>("");
  console.log(subCategory);
  return (
    <div className="space-y-4">
      <SubCategorySelector
        zoneId={zoneId as string}
        value={subCategory}
        onChange={(value) => setSubCategory(value)}
      />
      <SubcategorySettingsForm
        zoneId={zoneId as string}
        selectedSubCategory={subCategory}
      />
    </div>
  );
};

export default ZoneSettings;

interface SubcategorySettingsFormProps {
  zoneId: string;
  selectedSubCategory: string;
}

const SubcategorySettingsForm = ({
  zoneId,
  selectedSubCategory,
}: SubcategorySettingsFormProps) => {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      zone: zoneId,
      subCategory: selectedSubCategory,
      fields: [],
      name: "",
      description: "",
      setting: {
        commissionType: "percentage",
        leaserCommission: { value: 0, min: 0, max: 0 },
        renterCommission: { value: 0, min: 0, max: 0 },
        tax: 0,
        expiry: "",
      },
    }),
    [zoneId, selectedSubCategory]
  );

  const { control, handleSubmit, setValue, reset } = useForm<ZoneFormValues>({
    defaultValues,
  });

  useEffect(() => {
    reset({
      ...defaultValues,
      subCategory: selectedSubCategory,
    });
  }, [selectedSubCategory, reset, defaultValues]);

  // const subCategory = useWatch({ control, name: "subCategory" });
  const selectedFields: string[] = useWatch({ control, name: "fields" }) || [];
  const shouldFetch = selectedSubCategory !== "" && zoneId !== "";
  const { data: zoneForm, isLoading } = useGetZoneFormByZoneAndSubCategory(
    zoneId,
    selectedSubCategory,
    !!shouldFetch
  );

  useEffect(() => {
    reset(defaultValues);
  }, [selectedSubCategory, reset, defaultValues]);

  useEffect(() => {
    if (zoneForm?.data) {
      reset(zoneForm?.data as any);
    }
  }, [zoneForm, reset]);

  const {
    mutateAsync: updateZoneForm,
    isPending: updating,
    error: updateError,
  } = useUpdateZoneForm();
  const {
    mutateAsync: addZoneForm,
    isPending: adding,
    error: addError,
  } = useAddZoneForm();

  const loading = updating || adding;
  const error = updateError || addError;

  const onSubmit = async (data: any) => {
    if (zoneForm) {
      await updateZoneForm({ id: zoneForm?.data?._id, data });
    } else {
      await addZoneForm(data);
    }
    router.push("/zone-management");
  };

  const shouldFetchFields = !!selectedSubCategory;

  const { data: fieldsData, isLoading: fieldsLoading } = useGetFieldsList({
    enabled: shouldFetchFields,
  });

  const fields: Field[] = fieldsData?.data?.fields || [];

  const handleAddField = (id: string) => {
    if (!selectedFields.includes(id)) {
      setValue("fields", [...selectedFields, id]);
    }
  };

  const handleRemoveField = (id: string) => {
    setValue(
      "fields",
      selectedFields.filter((fieldId) => fieldId !== id)
    );
  };

  const selectedFieldDetails: Field[] =
    fields?.filter((field: Field) => selectedFields.includes(field._id)) || [];

  if (!selectedSubCategory || selectedFields === undefined) {
    return (
      <p className="text-muted-foreground">
        Please select a subcategory for its setting
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Select Custom Fields */}
        <TextInput
          control={control}
          placeholder="Enter form name"
          name="name"
          label="Name"
        />
        <TextInput
          control={control}
          placeholder="Enter form description"
          name="description"
          label="Description"
        />
        <div className="space-y-2">
          {/*  name and description */}

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
                {selectedFieldDetails?.length > 0
                  ? selectedFieldDetails?.map((f: any) => f.label).join(", ")
                  : "Select fields..."}
                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search fields..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No field found.</CommandEmpty>
                  <CommandGroup>
                    {fieldsLoading ? (
                      <Loader />
                    ) : fields?.length > 0 ? (
                      fields?.map((field: Field) => {
                        const isSelected = selectedFields.includes(field._id);
                        return (
                          <CommandItem
                            key={field._id}
                            onSelect={() =>
                              isSelected
                                ? handleRemoveField(field._id)
                                : handleAddField(field._id)
                            }
                          >
                            {field.label}
                            {isSelected && (
                              <span className="ml-auto text-primary">✔</span>
                            )}
                          </CommandItem>
                        );
                      })
                    ) : (
                      <CommandEmpty>No field found.</CommandEmpty>
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Selected Badges */}
          {selectedFieldDetails?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedFieldDetails?.map((field: Field) => (
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
        {/* Commission Inputs */}
        <CommissionInputs control={control} className="col-span-2" />
        {/* Expiry */}
        <DateInput
          control={control}
          name="setting.expiry"
          label="Expiry"
        />
        {/* Tax Input */}
        <div className="col-span-2 md:col-span-1">
          <TextInput
            control={control}
            name="setting.tax"
            type="number"
            label="Tax"
            note="Tax percentage"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        className="w-full"
        variant="button"
        disabled={loading}
        type="submit"
      >
        {loading ? <Loader /> : "Save"}
      </Button>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </form>
  );
};
