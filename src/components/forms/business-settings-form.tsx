"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BusinessSettingsSchema } from "@/validations/businessSettings";
import { z } from "zod";

import TextInput from "./fields/text-input";
import FileInput from "./fields/file-input";
import Switch from "./fields/switch";
import SelectInput from "./fields/select-input";
import { Button } from "../ui/button";

type FormData = z.infer<typeof BusinessSettingsSchema>;

const BusinessSettingsForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(BusinessSettingsSchema),
    defaultValues: {
      maintenanceMode: false,
      companyName: "",
      companyEmail: "",
      phone: "",
      country: "",
      address: "",
      latitude: "",
      longitude: "",
      logo: null,
      favicon: null,
      timezone: "",
      //   timeFormat: "12hour",
      currencySymbol: "",
      currencyPosition: "left",
      digitAfterDecimal: 0,
      copyrightText: "",
      //   cookiesText: "",
      defaultCommissionRate: 0,
      commissionRate: 0,
      includeTax: false,
      customerPreference: false,
      orderInfoForAdmin: false,
      orderNotificationType: "firebase",
      freeServicesOrderOver: "",
      guestCheckout: false,
      whoWillConfirmOrder: "store",
      additionalChargeName: "",
      additionalChargeAmount: "",
      partialPayment: false,
      paymentMethods: "cod",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
    // Send to backend
  };

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
          name="companyEmail"
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
          name="latitude"
          placeholder="Latitude"
          label="Latitude"
        />
        <TextInput
          control={control}
          name="longitude"
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
          name="timezone"
          placeholder="Timezone"
          label="Timezone"
        />
        {/* <SelectInput
          control={control}
          name="time_format"
          label="Time Format"
          options={[
            { label: "12 Hour", value: "12hour" },
            { label: "24 Hour", value: "24hour" },
          ]}
        /> */}
        <TextInput
          control={control}
          name="currency_symbol"
          placeholder="Currency Symbol"
          label="Currency Symbol"
        />
        <SelectInput
          control={control}
          name="currency_position"
          placeholder="Currency Position"
          label="Currency Position"
          options={[
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ]}
        />
        <TextInput
          control={control}
          name="digitAfterDecimal"
          placeholder="Decimal Points"
          label="Decimal Points"
          type="number"
        />
        <TextInput
          control={control}
          name="copyrightText"
          placeholder="Copyright"
          label="Copyright"
        />
        {/* <TextInput control={control} name="cookiesText" label="Cookies Text" /> */}
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
          name="order_notification_type"
          label="Order Notification"
          options={[
            { label: "Firebase", value: "firebase" },
            { label: "Manual", value: "manual" },
          ]}
        />
        <TextInput
          control={control}
          name="freeServicesOrderOver"
          placeholder="Free Service on Order Over"
          label="Free Service on Order Over"
        />
        <Switch control={control} name="guestCheckout" label="Guest Checkout" />
        <SelectInput
          control={control}
          name="whoWillConfirmOrder"
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
          name="additionalChargeAmount"
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
          name="paymentMethods"
          label="Can pay the rest using"
          options={[
            { label: "Cash on Delivery", value: "cod" },
            { label: "Digital Payment", value: "digital_payment" },
            { label: "Both", value: "both" },
          ]}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} variant="button" className="mt-6 flex ml-auto">
        {isSubmitting ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
};

export default BusinessSettingsForm;
