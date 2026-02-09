"use client";

import { limit } from "@/config/constants";
import {
  useGetRefundPolicy,
  useSaveRefundPolicy,
} from "@/hooks/useRefundManagement";
import { useGetZone, useGetZones } from "@/hooks/useZones";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { H4 } from "../Typography";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import SelectInput from "./fields/SelectInput";
import Switch from "./fields/Switch";
import TextInput from "./fields/TextInput";
import { useTranslations } from "next-intl"; // Added import

const RefundPoliciesForm = () => {
  const t = useTranslations("translation"); // Initialize translation
  const [page, setPage] = useState(1);
  const [zone, setZone] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const { data, isLoading, error } = useGetZones({ page, limit });
  const zones = data?.data?.zones;

  const {
    data: zoneDetails,
    isLoading: zoneLoading,
    error: zoneError,
  } = useGetZone(zone, !!zone);
  const subCategories = zoneDetails?.data?.subCategories || [];

  const { data: refundPolicy, isLoading: refundPolicyLoading } =
    useGetRefundPolicy(zone, subCategory);

  const refundPolicyData = useMemo(
    () => refundPolicy?.data || {},
    [refundPolicy]
  );

  const methods = useForm({
    defaultValues: {
      allowFund: refundPolicyData?.allowFund || false,
      refundWindow: refundPolicyData?.refundWindow || "",
      cancellationCutoffTime: {
        days: refundPolicyData?.cancellationCutoffTime?.days || 0,
        hours: refundPolicyData?.cancellationCutoffTime?.hours || 0,
      },
      flatFee: {
        amount: refundPolicyData?.flatFee?.amount || 0,
        days: refundPolicyData?.flatFee?.days || 0,
        hours: refundPolicyData?.flatFee?.hours || 0,
      },
      noteText: refundPolicyData?.noteText || "",
    },
  });

  useEffect(() => {
    if (refundPolicyData) {
      const currentValues = methods.getValues();
      const newValues = {
        allowFund: refundPolicyData?.allowFund || false,
        refundWindow: refundPolicyData?.refundWindow || "",
        cancellationCutoffTime: {
          days: refundPolicyData?.cancellationCutoffTime?.days || 0,
          hours: refundPolicyData?.cancellationCutoffTime?.hours || 0,
        },
        flatFee: {
          amount: refundPolicyData?.flatFee?.amount || 0,
          days: refundPolicyData?.flatFee?.days || 0,
          hours: refundPolicyData?.flatFee?.hours || 0,
        },
        noteText: refundPolicyData?.noteText || "",
      };

      if (JSON.stringify(currentValues) !== JSON.stringify(newValues)) {
        methods.reset(newValues);
      }
    }
  }, [refundPolicyData, methods]);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const {
    mutateAsync: saveRefundPolicy,
    isPending,
    error: saveRefundPolicyError,
  } = useSaveRefundPolicy();

  const onSubmit = (data: any) => {
    saveRefundPolicy({
      zone,
      subCategory,
      data,
    });
  };

  const disabled = isLoading || zoneLoading || refundPolicyLoading || isPending;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t("zone")}</Label>
            <Select value={zone} onValueChange={setZone} disabled={isLoading}>
              <SelectTrigger className="w-full" disabled={isLoading}>
                <SelectValue
                  placeholder={isLoading ? t("loading") : t("selectZone")}
                />
              </SelectTrigger>
              <SelectContent>
                {zones?.map((zone: any) => (
                  <SelectItem key={zone._id} value={zone._id}>
                    {zone.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("subCategory")}</Label>
            <div>
              <Select
                value={subCategory}
                onValueChange={setSubCategory}
                disabled={isLoading || zoneLoading}
              >
                <SelectTrigger
                  className="w-full"
                  disabled={isLoading || zoneLoading}
                >
                  <SelectValue
                    placeholder={
                      isLoading || zoneLoading
                        ? t("loading")
                        : t("selectCategory")
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {subCategories?.map((subCategory: any) => (
                    <SelectItem key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {zoneError && (
                <p className="text-red-500">{zoneError?.message}</p>
              )}
            </div>
          </div>

          <Switch name="allowFund" label="allowRefund" control={control} />

          <div className="grid grid-cols-2 gap-4">
            <TextInput
              name="cancellationCutoffTime.days"
              label="cutoffTimeDays"
              type="number"
              control={control}
              placeholder={t("days")}
              min={0}
            />
            <TextInput
              name="cancellationCutoffTime.hours"
              label="hours"
              type="number"
              control={control}
              placeholder={t("hours")}
              min={0}
            />
          </div>

          <Separator className="md:col-span-2 mt-4" />
          <div className="space-y-2 grid md:col-span-2">
            <H4>{t("flatFee")}</H4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                name="flatFee.amount"
                label="amountSymbol"
                type="number"
                control={control}
                placeholder={t("amount")}
                min={0}
              />
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  name="flatFee.days"
                  label="timeDays"
                  type="number"
                  control={control}
                  placeholder={t("days")}
                  min={0}
                />
                <TextInput
                  name="flatFee.hours"
                  label="timeHours"
                  type="number"
                  control={control}
                  placeholder={t("hours")}
                  min={0}
                />
              </div>
            </div>
            <Separator className="mt-4" />
          </div>

          <SelectInput
            name="refundWindow"
            label="refundWindow"
            control={control}
            options={[
              { value: "full", label: t("full") },
              { value: "partial", label: t("partial") },
              { value: "custom", label: t("custom") },
            ]}
            disabled={!zone || zoneLoading}
            loading={zoneLoading}
          />
          <TextInput
            name="noteText"
            label="noteText"
            control={control}
            placeholder={t("enterValue", { value: t("noteText") })}
            type="textarea"
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button type="submit" variant="button" disabled={disabled}>
            {isPending ? t("saving") : t("saveInformation")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default RefundPoliciesForm;