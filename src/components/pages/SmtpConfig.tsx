"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  useGetBusinessSettings,
  useSaveBusinessSettings,
} from "@/hooks/useBusinessSettings";
import { SmtpMailSchema } from "@/validations/smtpConfig";
import { useEffect } from "react";
import BxTabs from "../BxTabs";
import SelectInput from "../forms/fields/SelectInput";
import Switch from "../forms/fields/Switch";
import TextInput from "../forms/fields/TextInput";
import SmtpConfigSkeleton from "../skeletons/SmtpConfigSkeleton";
import { useTranslations } from "next-intl";

const testMailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

const SmtpConfig = () => {
  return (
    <div className="border rounded-md p-4">
      <BxTabs
        defaultValue="mail-config"
        tabs={[
          {
            label: "mailConfig",
            value: "mail-config",
            content: <SmtpMailConfigForm />,
          },
          {
            label: "sendTest",
            value: "send-test",
            content: <TestMailForm />,
          },
        ]}
      />
    </div>
  );
};

export default SmtpConfig;

//
// -------------------- SMTP Mail Config Form --------------------
const SmtpMailConfigForm = () => {
  const t = useTranslations("translation");
  const { data, isLoading } = useGetBusinessSettings("mailConfig");
  const smsConfig = data?.data?.pageSettings;

  const methods = useForm<z.infer<typeof SmtpMailSchema>>({
    resolver: zodResolver(SmtpMailSchema),
    defaultValues: {
      enabled: true,
      mailerName: "",
      driver: "smtp",
      host: "",
      port: 587,
      userName: "",
      email: "",
      password: "",
      encryption: "tls",
    },
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    if (smsConfig) {
      reset(smsConfig);
    }
  }, [smsConfig, reset]);

  const {
    mutate,
    isPending,
    error: saveError,
  } = useSaveBusinessSettings("mailConfig");

  // Handle form submission
  const onSubmit = (data: z.infer<typeof SmtpMailSchema>) => {
    mutate(data);
  };

  if (isLoading) {
    return <SmtpConfigSkeleton />; // Display skeleton while loading
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <Switch name="enabled" control={control} label="enableMail" />

        <div className="grid md:grid-cols-2 gap-4">
          <TextInput
            name="mailerName"
            label="mailerName"
            placeholder={t("enterMailerName")}
            control={control}
          />
          <TextInput
            name="driver"
            label="driver"
            placeholder={t("enterDriver")}
            control={control}
          />
          <TextInput
            name="host"
            label="host"
            placeholder={t("enterHost")}
            control={control}
          />
          <TextInput
            name="port"
            label="port"
            placeholder={t("enterPort")}
            control={control}
            type="number"
          />
          <TextInput
            name="userName"
            label="userName"
            placeholder={t("enterUserName")}
            control={control}
          />
          <TextInput
            name="email"
            label="email"
            placeholder={t("enterEmail")}
            control={control}
          />
          <TextInput
            name="password"
            label="password"
            placeholder={t("enterPassword")}
            control={control}
          />
          <SelectInput
            name="encryption"
            control={control}
            label="encryption"
            options={[
              { label: "tls", value: "tls" },
              { label: "ssl", value: "ssl" },
              { label: "none", value: "none" },
            ]}
          />
        </div>

        <div className="flex justify-end">
          <Button variant="button" type="submit" disabled={isPending}>
            {isPending ? t("saving") : t("save")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

//
// -------------------- Test Mail Form --------------------
const TestMailForm = () => {
  const t = useTranslations("translation");
  const methods = useForm<z.infer<typeof testMailSchema>>({
    resolver: zodResolver(testMailSchema),
    defaultValues: {
      email: "",
    },
  });

  const { handleSubmit, control } = methods;

  const onSubmit = (data: z.infer<typeof testMailSchema>) => {
    console.log("Send test mail to:", data.email);
    // Call your test email API
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <TextInput
          name="email"
          label="email"
          control={control}
          placeholder={t("enterEmail")}
        />

        <div className="flex justify-end">
          <Button
            variant="button"
            type="submit"
            disabled={methods.formState.isSubmitting}
          >
            {methods.formState.isSubmitting ? t("sending") : t("sendMail")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
