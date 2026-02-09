"use client";

import { useForm } from "react-hook-form";
import CommissionInputs from "../forms/fields/CommissionInputs";
import DateInput from "../forms/fields/DateInput";
import TextInput from "../forms/fields/TextInput";
import Loader from "../Loader";
import SubCategorySelector from "../SubcategorySelector";
import { Button } from "../ui/button";

import { useGetDropdownByName } from "@/hooks/useDropdowns";
import { useGetFieldsList } from "@/hooks/useFields";
import {
  useAddZoneForm,
  useGetZoneFormByZoneAndSubCategory,
  useUpdateZoneForm,
} from "@/hooks/useZoneForms";
import { Field } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import MultiSelect from "../forms/fields/MultiSelect";
import { zoneFormSchema, ZoneFormValues } from "@/validations/zoneSettings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl"; // Import for translation

const ZoneSettings = () => {
  const t = useTranslations(); // Initialize translation
  const zoneId = useParams().id;
  const [subCategory, setSubCategory] = useState<string>("");

  const isSubCategorySelected = subCategory !== "";

  return (
    <div className="space-y-4">
      <SubCategorySelector
        zoneId={zoneId as string}
        value={subCategory}
        onChange={(value) => setSubCategory(value)}
      />

      {/* Conditionally render SubcategorySettingsForm only if subCategory is selected */}
      {isSubCategorySelected ? (
        <SubcategorySettingsForm
          zoneId={zoneId as string}
          selectedSubCategory={subCategory}
        />
      ) : (
        <p className="text-red-500 text-sm">{t("translation.selectSubcategoryToProceed")}</p>
      )}
    </div>
  );
};

export default ZoneSettings;

const SubcategorySettingsForm = ({
  zoneId,
  selectedSubCategory,
}: {
  zoneId: string;
  selectedSubCategory: string;
}) => {
  const t = useTranslations(); // Initialize translation
  const router = useRouter();

  const defaultValues: ZoneFormValues = useMemo(
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
      userDocuments: [],
      leaserDocuments: [],
    }),
    [zoneId, selectedSubCategory]
  );


  const { control, handleSubmit, reset, formState: { errors } } = useForm<ZoneFormValues>({
    defaultValues,
    resolver: zodResolver(zoneFormSchema),
  });

  const { data: documents, isLoading: documentsLoading } =
    useGetDropdownByName("userDocuments");
  const documentsValues: { name: string; value: string }[] =
    documents?.data?.values ?? [];

  const { data: leaserDocuments, isLoading: leaserDocumentsLoading } =
    useGetDropdownByName("leaserDocuments");
  const leaserDocumentsValues: { name: string; value: string }[] =
    leaserDocuments?.data?.values ?? [];

  const { data: zoneForm } = useGetZoneFormByZoneAndSubCategory(
    zoneId,
    selectedSubCategory
  );

  useEffect(() => {
    reset(defaultValues);
  }, [selectedSubCategory, reset, defaultValues]);

  useEffect(() => {
    if (!zoneForm?.data) return;

    const { name, description, fields = [], setting } = zoneForm.data;

    const {
      commissionType,
      leaserCommission = {},
      renterCommission = {},
      tax,
      expiry,
    } = setting;

    reset({
      zone: zoneId,
      subCategory: selectedSubCategory,
      name,
      description,
      fields: fields.map((f: any) => f._id),
      setting: {
        commissionType,
        leaserCommission,
        renterCommission,
        tax,
        expiry,
      },
      userDocuments: zoneForm.data.userDocuments,
      leaserDocuments: zoneForm.data.leaserDocuments,
    });
  }, [zoneForm, reset, zoneId, selectedSubCategory]);

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
    console.log("Form submitted:", data);

    if (zoneForm) {
      await updateZoneForm({ id: zoneForm?.data?._id, data });
    } else {
      await addZoneForm(data);
    }
    router.push("/zone-management");
  };

  const shouldFetchFields = !!selectedSubCategory;

  const { data: fieldsData, isLoading: fieldsLoading } =
    useGetFieldsList({
      enabled: shouldFetchFields,
    });

  const fields: Field[] = fieldsData?.data?.fields?.filter(
    (f: Field) => !f.isFixed
  ) || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <TextInput
          control={control}
          placeholder={t("translation.enterFormName")}
          name="name"
          label="name"
        />
        <TextInput
          control={control}
          placeholder={t("translation.enterFormDescription")}
          name="description"
          label="description"
        />

        {/* Fields multiselect */}
        <MultiSelect<Field, ZoneFormValues>
          control={control}
          name={"fields"}
          label="selectCustomFields"
          options={fields}
          loading={fieldsLoading}
          getOptionValue={(f) => f._id}
          getOptionLabel={(f) => f.label}
          className="col-span-2"
          emptyText={t("translation.noFieldFound")}
          searchPlaceholder={t("translation.searchFields")}
        />
        {errors.fields && <p className="text-red-500 text-sm">{errors.fields.message}</p>}
        {documentsValues.length > 0 && (
          <> <MultiSelect<{ name: string; value: string }, ZoneFormValues>
            control={control}
            name={"userDocuments"}
            label="renterDocuments"
            note="renterDocumentsNote"
            options={documentsValues}
            loading={documentsLoading}
            getOptionValue={(d) => d.value}
            getOptionLabel={(d) => d.name}
            className="col-span-2"
            emptyText={t("translation.noDocumentFound")}
            searchPlaceholder={t("translation.searchDocuments")}
          />
            {errors.userDocuments && <p className="text-red-500 text-sm">{errors.userDocuments.message}</p>}
          </>
        )}

        {leaserDocumentsValues.length > 0 && (
          <>
            <MultiSelect<{ name: string; value: string }, ZoneFormValues>
              control={control}
              name={"leaserDocuments"}
              label="leaserDocuments"
              note="leaserDocumentsNote"
              options={leaserDocumentsValues}
              loading={leaserDocumentsLoading}
              getOptionValue={(d) => d.value}
              getOptionLabel={(d) => d.name}
              className="col-span-2"
              emptyText={t("translation.noDocumentFound")}
              searchPlaceholder={t("translation.searchDocuments")}
            />
            {errors.leaserDocuments && <p className="text-red-500 text-sm">{errors.leaserDocuments.message}</p>}
          </>
        )}

        {/* Commission Inputs */}
        <CommissionInputs control={control} className="col-span-2" />
        {/* Expiry */}
        <DateInput control={control} name="setting.expiry" label="expiry" />
        {/* Tax Input */}
        <div className="col-span-2 md:col-span-1">
          <TextInput
            control={control}
            name="setting.tax"
            type="number"
            label="tax" // 
            note={t("translation.taxPercentageNote")}
            min={0}
            max={100}
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
        {loading ? <Loader /> : t("translation.save")}
      </Button>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </form>
  );
};