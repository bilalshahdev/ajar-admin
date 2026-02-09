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
import { useTranslations } from "next-intl";

type FormData = z.infer<typeof BusinessSettingsSchema>;

const BusinessSettingsForm = () => {
  const t = useTranslations();

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
        label="maintenanceMode"
      />

      {/* Company Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TextInput
          control={control}
          name="companyName"
          placeholder="Company Name"
          label="companyName"
        />
        <TextInput
          control={control}
          name="email"
          placeholder="Company Email"
          label="companyEmail"
          type="email"
        />
        <TextInput
          control={control}
          name="phone"
          placeholder="Phone"
          label="phone"
        />
        <TextInput
          control={control}
          name="country"
          placeholder="Country"
          label="country"
        />
        <TextInput
          control={control}
          name="address"
          placeholder="Address"
          label="address"
        />
        <TextInput
          control={control}
          name="lat"
          placeholder="Latitude"
          label="latitude"
        />
        <TextInput
          control={control}
          name="long"
          placeholder="Longitude"
          label="longitude"
        />
        <FileInput
          control={control}
          name="logo"
          placeholder="Logo"
          label="logo"
        />
        <FileInput
          control={control}
          name="favicon"
          placeholder="Favicon"
          label="favicon"
        />
      </div>

      {/* General Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TextInput
          control={control}
          name="timeZone"
          placeholder="Timezone"
          label="timezone"
        />
        <TextInput
          control={control}
          name="currencySymbol"
          placeholder="Currency Symbol"
          label="currencySymbol"
        />
        <SelectInput
          control={control}
          name="currencyPosition"
          label="currencyPosition"
          options={[
            { label: "left", value: "left" },
            { label: "right", value: "right" },
          ]}
        />
        <TextInput
          control={control}
          name="decimalPoints"
          placeholder="Decimal Points"
          label="decimalPoints"
          type="number"
        />
        <TextInput
          control={control}
          name="copyRight"
          placeholder="Copyright"
          label="copyright"
        />
      </div>

      {/* Business Rules Setup */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TextInput
          control={control}
          name="defaultCommissionRate"
          placeholder="Default Commission Rate (%)"
          label="defaultCommissionRate"
          type="number"
        />
        <TextInput
          control={control}
          name="commissionRate"
          placeholder="Commission Rate (%)"
          label="commissionRate"
          type="number"
        />
        <Switch control={control} name="includeTax" label="includeTax" />
        <Switch
          control={control}
          name="customerPreference"
          label="customerPreference"
        />
        <Switch
          control={control}
          name="orderInfoForAdmin"
          label="orderInfoForAdmin"
        />
        <SelectInput
          control={control}
          name="orderNotification"
          label="orderNotification"
          options={[
            { label: "firebase", value: "firebase" },
            { label: "manual", value: "manual" },
          ]}
        />
        <TextInput
          control={control}
          name="freeServiceOnOrderOver"
          placeholder="Free Service on Order Over"
          label="freeServiceOnOrderOver"
        />
        <Switch control={control} name="guestCheckout" label="guestCheckout" />
        <SelectInput
          control={control}
          name="whoWillConfirmedOrder"
          label="whoWillConfirmedOrder"
          options={[
            { label: "store", value: "store" },
            { label: "deliveryman", value: "deliveryman" },
          ]}
        />
      </div>

      {/* Additional Charges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TextInput
          control={control}
          name="additionalChargeName"
          placeholder="Additional Charge Name"
          label="additionalChargeName"
        />
        <TextInput
          control={control}
          name="chargeAmount"
          placeholder="Charge Amount"
          label="chargeAmount"
        />
      </div>

      {/* Payment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Switch
          control={control}
          name="partialPayment"
          label="partialPayment"
        />
        <SelectInput
          control={control}
          name="canPayTheRestUsing"
          label="canPayTheRestUsing"
          options={[
            { label: "cashOnDelivery", value: "cod" },
            { label: "digitalPayment", value: "digital_payment" },
            { label: "both", value: "both" },
          ]}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        variant="button"
        className="mt-6 flex ml-auto"
      >
        {isPending ? t("translation.saving") : t("translation.saveSettings")}
      </Button>
    </form>
  );
};

export default BusinessSettingsForm;
