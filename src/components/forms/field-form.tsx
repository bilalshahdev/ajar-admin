"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import { useAppSelector } from "@/lib/store/hooks";
import { FieldFormValues, FieldSchema } from "@/validations/field";
import TextInput from "./fields/text-input";
import SelectInput from "./fields/select-input";
import FormArrayInput from "./fields/form-array-input";
import Switch from "./fields/switch";

const inputTypes = [
  { name: "String", value: "string" },
  { name: "Text", value: "text" },
  { name: "Number", value: "number" },
  { name: "Boolean", value: "boolean" },
  { name: "Date", value: "date" },
  { name: "Datetime", value: "datetime" },
  { name: "Time", value: "time" },
  { name: "Email", value: "email" },
  { name: "Phone", value: "phone" },
  { name: "URL", value: "url" },
  { name: "File", value: "file" },
  { name: "Image", value: "image" },
  { name: "Select", value: "select" },
  { name: "Multi Select", value: "multiselect" },
  { name: "Radio", value: "radio" },
  { name: "Range", value: "range" },
  { name: "Color", value: "color" },
  { name: "Location", value: "location" },
];

const flutterInputTypes = [...inputTypes];

export default function FieldForm({ id }: { id?: string }) {
  const field = useAppSelector((s: any) =>
    s.fields?.find((f: any) => f._id === id)
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<FieldFormValues>({
    resolver: zodResolver(FieldSchema),
    defaultValues: {
      name: field?.name || "",
      label: field?.label || "",
      type: field?.type || inputTypes[0].value,
      flutterType: field?.flutterType || flutterInputTypes[0].value,
      placeholder: field?.placeholder || "",
      order: field?.order ?? 0,
      isMultiple: field?.isMultiple ?? false,
      visible: field?.visible ?? true,
      tooltip: field?.tooltip || "",
      defaultValue: field?.defaultValue ?? "",
      readonly: field?.readonly ?? false,
      options: field?.options ?? [],
      validation: {
        required: field?.validation?.required ?? false,
        pattern: field?.validation?.pattern ?? "",
        min: field?.validation?.min ?? undefined,
        max: field?.validation?.max ?? undefined,
      },
    },
  });

  const isMultiple = watch("isMultiple");

  const onSubmit = (data: FieldFormValues) => {
    console.log(id ? "Update Field:" : "Create Field:", data);
    // TODO: dispatch or API call
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <TextInput
          control={control}
          name="name"
          label="Field Name"
          placeholder="Enter field name"
        />
        <TextInput
          control={control}
          name="label"
          label="Label"
          placeholder="Enter label"
        />
        <SelectInput
          control={control}
          name="type"
          label="Input Type"
          options={inputTypes.map((t) => ({ label: t.name, value: t.value }))}
        />
        <SelectInput
          control={control}
          name="flutterType"
          label="Flutter Input Type"
          options={flutterInputTypes.map((t) => ({
            label: t.name,
            value: t.value,
          }))}
        />
        <TextInput
          control={control}
          name="order"
          type="number"
          label="Order"
          placeholder="Enter order"
        />
        <TextInput
          control={control}
          name="placeholder"
          label="Placeholder"
          placeholder="Enter placeholder"
        />
        <TextInput
          control={control}
          name="tooltip"
          label="Tooltip"
          placeholder="Enter tooltip"
        />
        <TextInput
          control={control}
          name="defaultValue"
          label="Default Value"
          placeholder="Enter default value"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Switch control={control} name="visible" label="Visible" />
        <Switch control={control} name="readonly" label="Readonly" />
        <Switch control={control} name="validation.required" label="Required" />
        <Switch control={control} name="isMultiple" label="Is Multiple" />
      </div>

      {/* i want to show options input if isMultiple is true */}

      <div className="grid grid-cols-2 gap-4">
        {isMultiple && (
          <FormArrayInput control={control} name="options" label="Options" />
        )}
        <TextInput
          control={control}
          name="validation.pattern"
          label="Validation Pattern"
          placeholder="Enter validation pattern"
        />
        <TextInput
          control={control}
          name="validation.min"
          type="number"
          label="Min Value"
          placeholder="Enter min value"
        />
        <TextInput
          control={control}
          name="validation.max"
          type="number"
          label="Max Value"
          placeholder="Enter max value"
        />
      </div>

      <Button
        type="submit"
        variant="button"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader /> : id ? "Update Field" : "Create Field"}
      </Button>
    </form>
  );
}
