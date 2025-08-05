"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useAddField, useGetField, useUpdateField } from "@/hooks/useFields";
import { FieldFormValues, FieldSchema } from "@/validations/field";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FormArrayInput from "./fields/form-array-input";
import SelectInput from "./fields/select-input";
import Switch from "./fields/switch";
import TextInput from "./fields/text-input";

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
  const { control, handleSubmit, watch, reset } = useForm<FieldFormValues>({
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

  const { data: field, isLoading: isFieldLoading } = useGetField(
    id || "",
    !!id
  );

  useEffect(() => {
    if (field?.data) {
      const {
        name,
        label,
        type,
        placeholder,
        order,
        isMultiple,
        visible,
        tooltip,
        defaultValue,
        readonly,
        options,
        validation,
      } = field.data;
      reset({
        name,
        label,
        type,
        placeholder,
        order: order ?? 0, // default to 0
        isMultiple,
        visible,
        tooltip,
        defaultValue,
        readonly,
        options: options || [],
        validation: {
          required: validation?.required ?? false,
          pattern: validation?.pattern ?? "",
          min: validation?.min ?? 0,
          max: validation?.max ?? 0,
        },
      });
    }
  }, [field, reset]);

  // const { data: allCategories, isLoading: isCategoriesLoading } =
  //   useGet();

  // const type = useWatch({ control, name: "type" });

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

  // if (isFieldLoading && id) return <Loader />;

  const isMultiple = watch("isMultiple");
  const type = watch("type");
  const typesWithOptions = ["select", "radio", "multiselect"];

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

        {typesWithOptions.includes(type) && (
          <FormArrayInput control={control} name="options" label="Options" />
        )}

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
        disabled={fieldLoading}
      >
        {fieldLoading ? <Loader /> : id ? "Update Field" : "Create Field"}
      </Button>
    </form>
  );
}
