"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useAddField, useGetField, useUpdateField } from "@/hooks/useFields";
import { FieldFormValues, FieldSchema } from "@/validations/field";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FormArrayInput from "./fields/FormArrayInput";
import SelectInput from "./fields/SelectInput";
import Switch from "./fields/Switch";
import TextInput from "./fields/TextInput";

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

export default function FieldForm({ id }: { id?: string }) {
  const router = useRouter();
  const { data: field, isLoading: isFieldLoading } = useGetField(
    id || "",
    !!id
  );
  const { control, handleSubmit, watch, reset, setValue } =
    useForm<FieldFormValues>({
      resolver: zodResolver(FieldSchema),
      defaultValues: {
        name: "",
        label: "",
        type: inputTypes[0].value,
        placeholder: "",
        order: 0,
        isMultiple: false,
        visible: true,
        tooltip: "",
        defaultValue: "",
        readonly: false,
        options: [],
        validation: {
          required: false,
          pattern: "",
          min: 0,
          max: 0,
        },
      },
    });

  useEffect(() => {
    if (field) {
      const f = field.data;
      reset(
        {
          name: f.name,
          label: f.label,
          type: f.type || inputTypes[0].value, // fallback
          placeholder: f.placeholder,
          order: f.order ?? 0,
          isMultiple: f.isMultiple,
          visible: f.visible,
          tooltip: f.tooltip,
          defaultValue: f.defaultValue,
          readonly: f.readonly,
          options: f.options || [],
          validation: {
            required: f.validation?.required ?? false,
            pattern: f.validation?.pattern ?? "",
            min: f.validation?.min ?? 0,
            max: f.validation?.max ?? 0,
          },
        },
        {}
      );
    }
  }, [field, reset]);

  const isEditMode = Boolean(id);

  const updateMutation = useUpdateField();
  const addMutation = useAddField();

  const { mutate: fieldMutation, isPending: fieldLoading } = isEditMode
    ? updateMutation
    : addMutation;
  const onSubmit = async (formData: FieldFormValues) => {
    const mutationPayload = id ? { id, data: formData } : formData;
    fieldMutation(mutationPayload as any, {
      onSuccess: () => {
        reset();
        router.push("/field-management");
      },
    });
  };

  if (isFieldLoading && id) return <Loader />;

  const type = watch("type");
  const typesWithOptions = ["select", "radio", "multiselect"];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
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
          options={inputTypes}
          labelKey="name"
          valueKey="value"
        />
        {typesWithOptions.includes(type) && (
          <FormArrayInput control={control} name="options" label="Options" />
        )}
        <TextInput
          control={control}
          name="name"
          note="Must be like firstName, lastName, email, password etc."
          label="Field Name"
          placeholder="Enter field name"
          disabled={isEditMode}
        />
        <TextInput
          control={control}
          name="placeholder"
          label="Placeholder"
          placeholder="Enter placeholder"
        />
        <TextInput
          control={control}
          name="order"
          note="Order of the field in the form"
          type="number"
          label="Order"
          placeholder="Enter order"
          min={0}
        />
        <TextInput
          control={control}
          name="tooltip"
          label="Tooltip"
          note="Text to be displayed when user hovers over the field"
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

      <div className="grid grid-cols-2 gap-4">
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
          min={0}
        />
        <TextInput
          control={control}
          name="validation.max"
          type="number"
          label="Max Value"
          placeholder="Enter max value"
          min={0}
        />
      </div>

      <Button
        type="submit"
        variant="button"
        className="w-full"
        disabled={fieldLoading}
      >
        {fieldLoading ? <Loader /> : id ? "Update Field" : "Create Field"}
      </Button>
    </form>
  );
}
