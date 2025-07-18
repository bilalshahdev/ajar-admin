"use client";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import Switch from "../forms/fields/switch";
import { Textarea } from "../ui/textarea";


const messagesEN = [
    { key: "bookingPending", label: "Booking Pending Message" },
    { key: "bookingConfirmed", label: "Booking Confirmation Message" },
    { key: "bookingProcessing", label: "Booking Processing Message" },
    { key: "bookingDelivered", label: "Booking Delivered Message" },
    { key: "bookingCanceled", label: "Booking Canceled Message" },
    { key: "refundCanceled", label: "Refund Request Canceled Message" },
    // Add more based on image...
  ];

const PushNotificationForm = () => {
  const methods = useForm({
    defaultValues: {
      language: "en",
      messages: messagesEN.map((msg) => ({
        key: msg.key,
        label: msg.label,
        enabled: true,
        value: "",
      })),
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const { fields } = useFieldArray({ control, name: "messages" });

  const onSubmit = (data: any) => {
    console.log("Push Notifications:", data);
    // submit to backend
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {fields.map((field, idx) => (
            <div key={field.id} className="space-y-2 border p-4 rounded-md">
              <div className="flex justify-between items-center">
                <label className="font-medium">{field.label}</label>
                <Switch
                  name={`messages.${idx}.enabled`}
                  control={control}
                  label=""
                />
              </div>
              <Textarea
                {...methods.register(`messages.${idx}.value`)}
                placeholder="Write your message..."
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <Button type="submit" variant="button" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default PushNotificationForm;
