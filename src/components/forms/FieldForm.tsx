"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl"; // Added import

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

// Labels turned into camelCase keys for translation
const inputTypes = [
  { name: "string", value: "string" },
  { name: "text", value: "text" },
  { name: "number", value: "number" },
  { name: "boolean", value: "boolean" },
  { name: "date", value: "date" },
  { name: "datetime", value: "datetime" },
  { name: "time", value: "time" },
  { name: "email", value: "email" },
  { name: "phone", value: "phone" },
  { name: "url", value: "url" },
  { name: "file", value: "file" },
  { name: "image", value: "image" },
  { name: "select", value: "select" },
  { name: "multiselect", value: "multiselect" },
  { name: "radio", value: "radio" },
  { name: "range", value: "range" },
  { name: "color", value: "color" },
  { name: "location", value: "location" },
];

export default function FieldForm({ id }: { id?: string }) {
  const t = useTranslations(); // Initialize translation
  const router = useRouter();
  const [isChoiceField, setIsChoiceField] = useState(false);
  const [parentFieldId, setParentFieldId] = useState<string | null>(null);
  const [parentFieldOption, setParentFieldOption] = useState<string | null>(null);

  const [parentFieldIdError, setParentFieldIdError] = useState<string | null>(null);
  const [parentFieldOptionError, setParentFieldOptionError] = useState<string | null>(null);

  const { data: field, isLoading: isFieldLoading } = useGetField(id || "", !!id);
  
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
        error: "",
        min: 0,
        max: 0,
      },
    },
  });

  useEffect(() => {
    if (field) {
      const f = field.data;
      reset({
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
      });
    }
  }, [field, reset]);

  const { data: fieldsList } = useGetChoiceFieldsList({ enabled: isChoiceField });

  const isEditMode = Boolean(id);
  const updateMutation = useUpdateField();
  const addMutation = useAddField();

  const { mutate: fieldMutation, isPending: fieldLoading } = isEditMode ? updateMutation : addMutation;

  const onSubmit = async (formData: any) => {
    setParentFieldIdError(null);
    setParentFieldOptionError(null);

    if (isChoiceField && !parentFieldId) {
      setParentFieldIdError(t("translation.pleaseSelectField"));
      return;
    }

    if (isChoiceField && parentFieldId && !parentFieldOption) {
      setParentFieldOptionError(t("translation.pleaseSelectOption"));
      return;
    }

    formData.conditional = {
      dependsOn: parentFieldId,
      value: parentFieldOption,
    };

    const mutationPayload = id ? { id, data: formData } : formData;
    fieldMutation(mutationPayload, {
      onSuccess: () => {
        reset();
        router.push("/field-management");
      },
    });
  };

  const handleDependsOnChange = () => {
    setIsChoiceField(!isChoiceField);
    setParentFieldId(null);
    setParentFieldOption(null);
    setParentFieldIdError(null);
    setParentFieldOptionError(null);
  };

  if (isFieldLoading && id) return <Loader />;

  const type = watch("type");
  const typesWithOptions = ["select", "radio", "multiselect"];

  const selectedField = fieldsList?.data?.fields?.find((f) => f._id === parentFieldId);

  const fieldOptions = fieldsList?.data?.fields.map((f) => ({
    label: f.name,
    value: f._id,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {!id && (
        <div className="inline-flex items-center gap-4 p-4 bg-accent rounded-md">
          <Label htmlFor="is-child-field" className="cursor-pointer">
            {t("translation.isChildField")}
          </Label>
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
              label="dependsOnField"
              options={fieldOptions || []}
              value={parentFieldId}
              onChange={(id) => {
                setParentFieldId(id);
                setParentFieldOption(null);
                setParentFieldIdError(null);
              }}
            />
            {parentFieldIdError && <span className="text-red-500 text-sm">{parentFieldIdError}</span>}
          </div>
          {parentFieldId && (
            <div>
              <SelectInput
                label="whenValueIs"
                options={selectedField?.options?.map((opt) => ({ label: opt, value: opt })) || []}
                value={parentFieldOption}
                onChange={(value) => {
                  setParentFieldOption(value);
                  setParentFieldOptionError(null);
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
          label="label"
          placeholder={t("translation.egEnterLabel")}
        />
        <SelectInput
          control={control}
          name="type"
          label="inputType"
          options={inputTypes}
          labelKey="name"
          valueKey="value"
          disabled={!!id}
        />
        {typesWithOptions.includes(type) && (
          <FormArrayInput control={control} name="options" label="options" />
        )}
        <TextInput
          control={control}
          name="name"
          note={t("translation.fieldNameNote")}
          label="fieldName"
          placeholder={t("translation.egEnterFieldName")}
          disabled={isEditMode}
        />
        <TextInput
          control={control}
          name="placeholder"
          label="placeholder"
          placeholder={t("translation.egEnterPlaceholder")}
        />
        <TextInput
          control={control}
          name="tooltip"
          label="tooltip"
          note={t("translation.tooltipNote")}
          placeholder={t("translation.egEnterTooltip")}
        />
        <TextInput
          control={control}
          name="defaultValue"
          label="defaultValue"
          placeholder={t("translation.egEnterDefaultValue")}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Switch control={control} name="visible" label="visible" />
        <Switch control={control} name="readonly" label="readonly" />
        <Switch control={control} name="validation.required" label="required" />
        <Switch control={control} name="isMultiple" label="isMultiple" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          control={control}
          name="validation.pattern"
          label="validationPattern"
          placeholder={t("translation.egEnterValidationPattern")}
        />
        <TextInput
          note={t("translation.validationErrorNote")}
          type="text"
          control={control}
          name="validation.error"
          label="validationError"
          placeholder={t("translation.egEnterValidationError")}
        />
        <TextInput
          control={control}
          name="validation.min"
          type="number"
          label="minValue"
          placeholder={t("translation.egEnterMinValue")}
          min={0}
        />
        <TextInput
          control={control}
          name="validation.max"
          type="number"
          label="maxValue"
          placeholder={t("translation.egEnterMaxValue")}
          min={0}
        />
      </div>

      <Button
        type="submit"
        variant="button"
        className="w-full"
        disabled={fieldLoading}
      >
        {fieldLoading ? <Loader /> : id ? t("translation.updateField") : t("translation.createField")}
      </Button>
    </form>
  );
}