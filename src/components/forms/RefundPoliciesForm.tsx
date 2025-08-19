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

const RefundPoliciesForm = () => {
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
      // zone: zone,
      // subCategory: subCategory,
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
    // Send data to API
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
          {/* Zone & Category */}
          <div className="space-y-2">
            <Label>Zone</Label>
            <Select value={zone} onValueChange={setZone} disabled={isLoading}>
              <SelectTrigger className="w-full" disabled={isLoading}>
                <SelectValue
                  placeholder={isLoading ? "Loading..." : "Select a zone"}
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
            <Label>Sub Category</Label>
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
                        ? "Loading..."
                        : "Select a category"
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

          {/* Allow Refund */}
          <Switch name="allowFund" label="Allow Refund" control={control} />

          {/* Cancellation Cutoff Time */}
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              name="cancellationCutoffTime.days"
              label="Cutoff Time (Days)"
              type="number"
              control={control}
              placeholder="Days"
              min={0}
            />
            <TextInput
              name="cancellationCutoffTime.hours"
              label="(Hours)"
              type="number"
              control={control}
              placeholder="Hours"
              min={0}
            />
          </div>

          {/* Flat Fee Fields */}
          <Separator className="md:col-span-2 mt-4" />
          <div className="space-y-2 grid md:col-span-2">
            <H4>Flat Fee</H4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                name="flatFee.amount"
                label="Amount ($)"
                type="number"
                control={control}
                placeholder="Amount"
                min={0}
              />
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  name="flatFee.days"
                  label="Time (Days)"
                  type="number"
                  control={control}
                  placeholder="Days"
                  min={0}
                />
                <TextInput
                  name="flatFee.hours"
                  label="Time (Hours)"
                  type="number"
                  control={control}
                  placeholder="Hours"
                  min={0}
                />
              </div>
            </div>
            <Separator className="mt-4" />
          </div>

          {/* refund window: full , partial, custom */}
          <SelectInput
            name="refundWindow"
            label="Refund Window"
            control={control}
            options={[
              { value: "full", label: "Full" },
              { value: "partial", label: "Partial" },
              { value: "custom", label: "Custom" },
            ]}
            disabled={!zone || zoneLoading}
            loading={zoneLoading}
          />
          {/* Notes */}
          <TextInput
            name="noteText"
            label="Note Text"
            control={control}
            placeholder="Enter Note Text"
            type="textarea"
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          {/* <Button type="button" variant="outline">
            Reset
          </Button> */}
          <Button type="submit" variant="button" disabled={disabled}>
            {isPending ? "Saving..." : "Save Information"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default RefundPoliciesForm;
