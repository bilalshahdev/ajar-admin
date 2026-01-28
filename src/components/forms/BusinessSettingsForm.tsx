"use client";

import { BusinessSettingsSchema } from "@/validations/businessSettings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  useGetBusinessSettings,
  useSaveBusinessSettings,
} from "@/hooks/useBusinessSettings";
import { useEffect } from "react";
import BusinessInfoSkeleton from "../skeletons/BusinessinfoSkeleton";
import { Button } from "../ui/button";
import FileInput from "./fields/FileInput";
import SelectInput from "./fields/SelectInput";
import Switch from "./fields/Switch";
import TextInput from "./fields/TextInput";

type FormData = z.infer<typeof BusinessSettingsSchema>;

const BusinessSettingsForm = () => {
  const { data, isLoading } = useGetBusinessSettings("businessInfo");
  const businessInfo = data?.data?.pageSettings;

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(BusinessSettingsSchema),
    defaultValues: {
      companyName: "",
      email: "",
      country: "",
      address: "",
      long: "",
      lat: "",
      phone: "",
      logo: "",
      favicon: "",
      timeZone: "",
      currencySymbol: "",
      currencyPosition: "left",
      decimalPoints: 0,
      copyRight: "",
      defaultCommissionRate: 0,
      commissionRate: 0,
      includeTax: false,
      customerPreference: false,
      orderInfoForAdmin: false,
      orderNotification: "firebase",
      freeServiceOnOrderOver: "",
      guestCheckout: false,
      whoWillConfirmedOrder: "store",
      additionalChargeName: "",
      chargeAmount: "",
      partialPayment: false,
      canPayTheRestUsing: "cod",
    },
  });

  useEffect(() => {
    if (businessInfo) {
      reset(businessInfo);
    }
  }, [businessInfo, reset]);

  const { mutate: saveBusinessSettings, isPending } =
    useSaveBusinessSettings("businessInfo");
  const onSubmit = (data: FormData) => {
    saveBusinessSettings(data);
  };

  if (isLoading) {
    return <BusinessInfoSkeleton />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <Switch
        control={control}
        name="maintenanceMode"
        label="Maintenance Mode"
      />

      {/* Company Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TextInput
          control={control}
          name="companyName"
          placeholder="Company Name"
          label="Company Name"
        />
        <TextInput
          control={control}
          name="email"
          placeholder="Company Email"
          label="Company Email"
          type="email"
        />
        <TextInput
          control={control}
          name="phone"
          placeholder="Phone"
          label="Phone"
        />
        <TextInput
          control={control}
          name="country"
          placeholder="Country"
          label="Country"
        />
        <TextInput
          control={control}
          name="address"
          placeholder="Address"
          label="Address"
        />
        <TextInput
          control={control}
          name="lat"
          placeholder="Latitude"
          label="Latitude"
        />
        <TextInput
          control={control}
          name="long"
          placeholder="Longitude"
          label="Longitude"
        />
        <FileInput
          control={control}
          name="logo"
          placeholder="Logo"
          label="Logo"
        />
        <FileInput
          control={control}
          name="favicon"
          placeholder="Favicon"
          label="Favicon"
        />
      </div>

      {/* General Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TextInput
          control={control}
          name="timeZone"
          placeholder="Timezone"
          label="Timezone"
        />
        <TextInput
          control={control}
          name="currencySymbol"
          placeholder="Currency Symbol"
          label="Currency Symbol"
        />
        <SelectInput
          control={control}
          name="currencyPosition"
          label="Currency Position"
          options={[
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ]}
        />
        <TextInput
          control={control}
          name="decimalPoints"
          placeholder="Decimal Points"
          label="Decimal Points"
          type="number"
        />
        <TextInput
          control={control}
          name="copyRight"
          placeholder="Copyright"
          label="Copyright"
        />
      </div>

      {/* Business Rules Setup */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TextInput
          control={control}
          name="defaultCommissionRate"
          placeholder="Default Commission Rate (%)"
          label="Default Commission Rate (%)"
          type="number"
        />
        <TextInput
          control={control}
          name="commissionRate"
          placeholder="Commission Rate (%)"
          label="Commission Rate (%)"
          type="number"
        />
        <Switch control={control} name="includeTax" label="Include Tax" />
        <Switch
          control={control}
          name="customerPreference"
          label="Customer Preference"
        />
        <Switch
          control={control}
          name="orderInfoForAdmin"
          label="Order Info for Admin"
        />
        <SelectInput
          control={control}
          name="orderNotification"
          label="Order Notification"
          options={[
            { label: "Firebase", value: "firebase" },
            { label: "Manual", value: "manual" },
          ]}
        />
        <TextInput
          control={control}
          name="freeServiceOnOrderOver"
          placeholder="Free Service on Order Over"
          label="Free Service on Order Over"
        />
        <Switch control={control} name="guestCheckout" label="Guest Checkout" />
        <SelectInput
          control={control}
          name="whoWillConfirmedOrder"
          label="Who Will Confirm Order"
          options={[
            { label: "Store", value: "store" },
            { label: "Deliveryman", value: "deliveryman" },
          ]}
        />
      </div>

      {/* Additional Charges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TextInput
          control={control}
          name="additionalChargeName"
          placeholder="Additional Charge Name"
          label="Additional Charge Name"
        />
        <TextInput
          control={control}
          name="chargeAmount"
          placeholder="Charge Amount"
          label="Charge Amount"
        />
      </div>

      {/* Payment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Switch
          control={control}
          name="partialPayment"
          label="Partial Payment"
        />
        <SelectInput
          control={control}
          name="canPayTheRestUsing"
          label="Can pay the rest using"
          options={[
            { label: "Cash on Delivery", value: "cod" },
            { label: "Digital Payment", value: "digital_payment" },
            { label: "Both", value: "both" },
          ]}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        variant="button"
        className="mt-6 flex ml-auto"
      >
        {isPending ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
};

export default BusinessSettingsForm;
