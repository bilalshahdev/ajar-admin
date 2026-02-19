"use client";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import Switch from "../forms/fields/Switch";
import { Textarea } from "../ui/textarea";
import {
  useGetBusinessSettings,
  useSaveBusinessSettings,
} from "@/hooks/useBusinessSettings";
import { useEffect } from "react";
import PushNotificationFormSkeleton from "../skeletons/PushNotificationFormSkeleton";
import { useTranslations } from "next-intl";

const messagesEN = [
  { key: "bookingPending", label: "bookingPending" },
  { key: "bookingConfirmed", label: "bookingConfirmed" },
  { key: "bookingProcessing", label: "bookingProcessing" },
  { key: "bookingDelivered", label: "bookingDelivered" },
  { key: "bookingCanceled", label: "bookingCanceled" },
  { key: "refundCanceled", label: "refundCanceled" },
];

const PushNotificationForm = () => {
  const t = useTranslations("translation");
  const { data, isLoading } = useGetBusinessSettings("firebase");
  const pageSettings = data?.data?.pageSettings;
  const pushNotifications = pageSettings?.pushNotifications;

  const methods = useForm({
    defaultValues: {
      language: "en",
      messages: messagesEN.map((msg) => ({
        key: msg.key,
        label: msg.label,
        enabled:
          pushNotifications?.messages?.find((m: any) => m.key === msg.key)
            ?.enabled || false,
        value:
          pushNotifications?.messages?.find((m: any) => m.key === msg.key)
            ?.value || "",
      })),
    },
  });

  const { control, handleSubmit, reset } = methods;
  const { fields } = useFieldArray({ control, name: "messages" });

  useEffect(() => {
    if (pushNotifications) {
      reset(pushNotifications);
    }
  }, [pushNotifications, reset]);

  const {
    mutate,
    isPending,
    error: saveError,
  } = useSaveBusinessSettings("firebase");

  const onSubmit = (data: any) => {
    mutate({ ...pageSettings, pushNotifications: data });
  };

  if (isLoading) {
    return <PushNotificationFormSkeleton />;
  }

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
                  label="enable"
                />
              </div>
              <Textarea
                {...methods.register(`messages.${idx}.value`)}
                placeholder={t("writeYourMessage")}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <Button type="submit" variant="button" disabled={isPending}>
            {isPending ? t("saving") : t("save")}
          </Button>
        </div>
        {saveError && (
          <p className="text-red-500 mt-2">
            {saveError?.message || t("somethingWentWrong")}
          </p>
        )}
      </form>
    </FormProvider>
  );
};

export default PushNotificationForm;
