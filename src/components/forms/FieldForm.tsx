"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Switch as USwitch } from "@/components/ui/switch";
import { useAddField, useGetChoiceFieldsList, useGetField, useUpdateField } from "@/hooks/useFields";
import { FieldFormValues, FieldSchema } from "@/validations/field";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
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
  const [isChoiceField, setIsChoiceField] = useState(false);
  const [parentFieldId, setParentFieldId] = useState<string | null>(null);
  const [parentFieldOption, setParentFieldOption] = useState<string | null>(null);

  const [parentFieldIdError, setParentFieldIdError] = useState<string | null>(null);
  const [parentFieldOptionError, setParentFieldOptionError] = useState<string | null>(null);


  const { data: field, isLoading: isFieldLoading } = useGetField(
    id || "",
    !!id
  );
  const { control, handleSubmit, watch, reset } =
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
          error: "",
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
          type: f.type || inputTypes[0].value,
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
            error: f.validation?.error ?? "",
            min: f.validation?.min ?? 0,
            max: f.validation?.max ?? 0,
          },
        },
        {}
      );
    }
  }, [field, reset]);

  const { data: fieldsList, isLoading: isFieldsListLoading } = useGetChoiceFieldsList({ enabled: isChoiceField });

  const isEditMode = Boolean(id);

  const updateMutation = useUpdateField();
  const addMutation = useAddField();

  const { mutate: fieldMutation, isPending: fieldLoading } = isEditMode
    ? updateMutation
    : addMutation;

  const onSubmit = async (formData: any) => {
    // Clear previous errors
    setParentFieldIdError(null);
    setParentFieldOptionError(null);

    // Custom validation for parentFieldId and parentFieldOption
    if (isChoiceField && !parentFieldId) {
      setParentFieldIdError("Please select a field.");
      return;
    }

    if (isChoiceField && parentFieldId && !parentFieldOption) {
      setParentFieldOptionError("Please select an option for the selected field.");
      return;
    }

    formData.conditional = {
      dependsOn: parentFieldId,
      value: parentFieldOption,
    };

    // Proceed with the mutation if validation passes
    const mutationPayload = id ? { id, data: formData } : formData;
    fieldMutation(mutationPayload, {
      onSuccess: () => {
        reset();
        router.push("/field-management");
      },
    });
  };

  const handleChildFieldIdChange = (id: string) => {
    setParentFieldId(id);
    setParentFieldOption(null);
    setParentFieldIdError(null)
  };
  const handleChildFieldOptionChange = (value: string) => {
    setParentFieldOption(value);
    setParentFieldOptionError(null);
  };

  const handleDependsOnChange = () => {
    setIsChoiceField(!isChoiceField)
    setParentFieldId(null);
    setParentFieldOption(null);
    setParentFieldIdError(null)
    setParentFieldOptionError(null)
  }


  if (isFieldLoading && id) return <Loader />;

  const type = watch("type");
  const typesWithOptions = ["select", "radio", "multiselect"];

  const selectedField = fieldsList?.data?.fields?.find(
    (field) => field._id === parentFieldId
  );

  const fieldOptions = fieldsList?.data?.fields.map((f) => ({
    label: f.name,
    value: f._id,
  }));



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {!id && (
        <div className="inline-flex items-center gap-4 p-4 bg-accent rounded-md">
          <Label htmlFor="is-child-field" className="cursor-pointer">Is Child Field</Label>
          <USwitch
            id="is-child-field"
            className="cursor-pointer"
            checked={isChoiceField}
            onCheckedChange={handleDependsOnChange}
          />
        </div>
      )}

      {isChoiceField && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <SelectInput
              label="Depends On Field"
              options={fieldOptions || []}
              value={parentFieldId}
              onChange={(id) => handleChildFieldIdChange(id)}
            />
            {parentFieldIdError && <span className="text-red-500 text-sm">{parentFieldIdError}</span>}
          </div>
          {parentFieldId && (
            <div>
              <SelectInput
                label="When Value Is"
                options={selectedField?.options?.map((opt) => ({ label: opt, value: opt })) || []}
                value={parentFieldOption}
                onChange={(value) => {
                  handleChildFieldOptionChange(value)
                }}
              />
              {parentFieldOptionError && <span className="text-red-500 text-sm">{parentFieldOptionError}</span>}
            </div>
          )}
        </div>
      )}

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
          disabled={!!id}
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
          note="Text to be displayed when validation fails"
          type="text"
          control={control}
          name="validation.error"
          label="Validation Error"
          placeholder="Enter validation error"
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
