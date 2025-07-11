"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentSettingsSchema } from "@/validations/paymentSettings";
import { z } from "zod";

import Switch from "./fields/switch";
import SelectInput from "./fields/select-input";
import TextInput from "./fields/text-input";
import FileInput from "./fields/file-input";
import { Button } from "../ui/button";

type FormData = z.infer<typeof PaymentSettingsSchema>;

const PaymentSettingsForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(PaymentSettingsSchema),
    defaultValues: {
      cash: false,
      digitalPayment: false,
      stripeEnabled: false,
      stripeEnv: "live",
      stripeApiKey: "",
      stripePublishKey: "",
      stripeTitle: "STRIPE",
      stripeLogo: null,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Submitted Payment Settings:", data);
    // Call backend update logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Toggles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Switch control={control} name="cash" label="Cash" />
        <Switch
          control={control}
          name="digitalPayment"
          label="Digital Payment"
        />
        <Switch control={control} name="stripeEnabled" label="Stripe" />
      </div>

      {/* Stripe Details (conditional display could be added later) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SelectInput
          control={control}
          name="stripeEnv"
          label="Stripe Environment"
          options={[
            { label: "Live", value: "live" },
            { label: "Sandbox", value: "sandbox" },
          ]}
        />
        <TextInput
          control={control}
          name="stripeApiKey"
          label="API Key"
          placeholder="Enter Stripe API key"
        />
        <TextInput
          control={control}
          name="stripePublishKey"
          label="Published Key"
          placeholder="Enter Stripe publishable key"
        />
        <TextInput
          control={control}
          name="stripeTitle"
          label="Payment Gateway Title"
          placeholder="e.g., STRIPE"
        />
        <FileInput control={control} name="stripeLogo" label="Logo" />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6 justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => reset()}
          className="px-6"
        >
          Reset
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="button"
          className="px-6"
        >
          {isSubmitting ? "Saving..." : "Save Information"}
        </Button>
      </div>
    </form>
  );
};

export default PaymentSettingsForm;
