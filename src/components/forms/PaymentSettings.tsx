"use client";

import { PaymentSettingsSchema } from "@/validations/paymentSettings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import FileInput from "./fields/FileInput";
import SelectInput from "./fields/SelectInput";
import Switch from "./fields/Switch";
import TextInput from "./fields/TextInput";

import {
  useGetBusinessSettings,
  useSaveBusinessSettings,
} from "@/hooks/useBusinessSettings";
import { useEffect } from "react";
import PaymentSettingsSkeleton from "../skeletons/PaymentSettingsSkeleton"; // Import the skeleton

type FormData = z.infer<typeof PaymentSettingsSchema>;

const PaymentSettingsForm = () => {
  // Fetch payment settings
  const { data, isLoading } = useGetBusinessSettings("paymentMethods");
  const paymentInfo = data?.data?.pageSettings;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(PaymentSettingsSchema),
    defaultValues: {
      cash: false,
      digitalPayment: false,
      stripe: false,
      stripeEnvironment: "live",
      apiKey: "",
      publishKey: "",
      paymentGatewayTitle: "STRIPE",
      logo: "",
    },
  });

  useEffect(() => {
    if (paymentInfo) {
      reset(paymentInfo);
    }
  }, [paymentInfo, reset]);
  
  // Mutate hook for saving settings
  const {
    mutate: savePaymentSettings,
    isPending,
    error: saveError,
  } = useSaveBusinessSettings("paymentMethods");

  // Handle form submission
  const onSubmit = (data: FormData) => {
    savePaymentSettings(data);
  };

  if (isLoading) {
    return <PaymentSettingsSkeleton />; // Display skeleton while loading
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Payment Method Toggles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Switch control={control} name="cash" label="Cash" />
          {errors.cash && (
            <p className="text-red-500 text-sm mt-1">{errors.cash.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Switch
            control={control}
            name="digitalPayment"
            label="Digital Payment"
          />
          {errors.digitalPayment && (
            <p className="text-red-500 text-sm mt-1">
              {errors.digitalPayment.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Switch control={control} name="stripe" label="Stripe" />
          {errors.stripe && (
            <p className="text-red-500 text-sm mt-1">{errors.stripe.message}</p>
          )}
        </div>
      </div>

      {/* Stripe Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <SelectInput
            control={control}
            name="stripeEnvironment"
            label="Stripe Environment"
            options={[
              { label: "Live", value: "live" },
              { label: "Sandbox", value: "sandbox" },
            ]}
          />
          {errors.stripeEnvironment && (
            <p className="text-red-500 text-sm mt-1">
              {errors.stripeEnvironment.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <TextInput
            control={control}
            name="apiKey"
            label="API Key"
            placeholder="Enter Stripe API key"
          />
          {errors.apiKey && (
            <p className="text-red-500 text-sm mt-1">{errors.apiKey.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <TextInput
            control={control}
            name="publishKey"
            label="Published Key"
            placeholder="Enter Stripe publishable key"
          />
          {errors.publishKey && (
            <p className="text-red-500 text-sm mt-1">
              {errors.publishKey.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <TextInput
            control={control}
            name="paymentGatewayTitle"
            label="Payment Gateway Title"
            placeholder="e.g., STRIPE"
          />
          {errors.paymentGatewayTitle && (
            <p className="text-red-500 text-sm mt-1">
              {errors.paymentGatewayTitle.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <FileInput control={control} name="logo" label="Logo" />
          {/* {errors.logo && (
            <p className="text-red-500 text-sm mt-1">{errors.logo.message}</p>
          )} */}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6 justify-end">
        <Button
          type="submit"
          disabled={isSubmitting || isPending}
          variant="button"
          className="px-6"
        >
          {isSubmitting || isPending ? "Saving..." : "Save Information"}
        </Button>
      </div>
    </form>
  );
};

export default PaymentSettingsForm;
