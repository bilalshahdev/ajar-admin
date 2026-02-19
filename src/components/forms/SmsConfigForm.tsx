"use client";
import { SmsConfigSchema } from "@/validations/smsConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import {
  useGetBusinessSettings,
  useSaveBusinessSettings,
} from "@/hooks/useBusinessSettings";
import { useEffect } from "react";
import SmsConfigFormSkeleton from "../skeletons/SmsConfigFormSkeleton";
import { Button } from "../ui/button";
import Switch from "./fields/Switch";
import TextInput from "./fields/TextInput";
import { useTranslations } from "next-intl";

const SmsConfigForm = () => {
  const t = useTranslations("translation");
  const { data, isLoading } = useGetBusinessSettings("smsModule");
  const smsConfig = data?.data?.pageSettings;

  const methods = useForm<z.infer<typeof SmsConfigSchema>>({
    resolver: zodResolver(SmsConfigSchema),
    defaultValues: {
      twilio: {
        active: false,
        sid: "",
        messagingServiceSid: "",
        token: "",
        from: "",
        otpTemplate: "",
      },
      twoFactor: {
        active: false,
        apiKey: "",
      },
    },
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    if (smsConfig) {
      reset(smsConfig);
    }
  }, [smsConfig, reset]);

  const {
    mutate: savePaymentSettings,
    isPending,
    error: saveError,
  } = useSaveBusinessSettings("smsModule");

  const onSubmit = (data: z.infer<typeof SmsConfigSchema>) => {
    savePaymentSettings(data);
  };

  if (isLoading) {
    return <SmsConfigFormSkeleton />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded shadow space-y-4">
            <h3 className="font-semibold mb-2">{t("twilio")}</h3>
            <Switch name="twilio.active" label="active" control={control} />
            <TextInput
              name="twilio.sid"
              label="sid"
              placeholder={t("enterSid")}
              control={control}
            />
            <TextInput
              name="twilio.messagingServiceSid"
              label="messagingServiceSID"
              placeholder={t("enterMessagingServiceSid")}
              control={control}
            />
            <TextInput
              name="twilio.token"
              label="token"
              placeholder={t("enterToken")}
              control={control}
            />
            <TextInput
              name="twilio.from"
              label="from"
              placeholder={t("enterFrom")}
              control={control}
            />
            <TextInput
              name="twilio.otpTemplate"
              label="otpTemplate"
              placeholder={t("enterOtpTemplate")}
              control={control}
            />
          </div>

          <div className="border p-4 rounded shadow space-y-4">
            <h3 className="font-semibold mb-2">{t("2Factor")}</h3>
            <Switch name="twoFactor.active" label="active" control={control} />
            <TextInput
              name="twoFactor.apiKey"
              label="apiKey"
              placeholder={t("enterApiKey")}
              control={control}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="mt-6 flex ml-auto"
          variant="button"
          disabled={isPending}
        >
          {isPending ? t("saving") : t("save")}
        </Button>
        {saveError && (
          <p className="text-red-500 mt-2">
            {saveError?.message || t("somethingWentWrong")}
          </p>
        )}
      </form>
    </FormProvider>
  );
};

export default SmsConfigForm;
