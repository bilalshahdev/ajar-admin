"use client";

import { RecaptchaSchema } from "@/validations/recaptcha";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import {
  useGetBusinessSettings,
  useSaveBusinessSettings,
} from "@/hooks/useBusinessSettings";
import Link from "next/link";
import { useEffect } from "react";
import RecaptchaFormSkeleton from "../skeletons/RecaptchaFormSkeleton";
import { Button } from "../ui/button";
import Switch from "./fields/Switch";
import TextInput from "./fields/TextInput";
import { useTranslations } from "next-intl";

const RecaptchaForm = () => {
  const t = useTranslations("translation");
  const { data, isLoading } = useGetBusinessSettings("recaptcha");
  const recaptcha = data?.data?.pageSettings;

  const methods = useForm<z.infer<typeof RecaptchaSchema>>({
    resolver: zodResolver(RecaptchaSchema),
    defaultValues: {
      enabled: recaptcha?.enabled || false,
      siteKey: recaptcha?.siteKey || "",
      secretKey: recaptcha?.secretKey || "",
    },
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    if (recaptcha) {
      reset(recaptcha);
    }
  }, [recaptcha, reset]);

  const { mutate, isPending } = useSaveBusinessSettings("recaptcha");

  const enabled = useWatch({ control, name: "enabled" });

  const onSubmit = (data: z.infer<typeof RecaptchaSchema>) => {
    mutate(data);
  };

  if (isLoading) {
    return <RecaptchaFormSkeleton />;
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 border rounded-lg p-6"
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">{t("recaptchaCredentialSetups")}</h2>

          <Switch name="enabled" control={control} label="turnOFF" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              name="siteKey"
              label="siteKey"
              control={control}
              placeholder={t("enterRecaptchaSiteKey")}
              disabled={!enabled}
            />
            <TextInput
              name="secretKey"
              label="secretKey"
              control={control}
              placeholder={t("enterRecaptchaSecretKey")}
              disabled={!enabled}
            />
          </div>

          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>
              {t("recaptchaStep1")}
              <Link
                className="text-blue-500 underline"
                href="https://www.google.com/recaptcha/admin"
                target="_blank"
              >
                {t("clickHere")}
              </Link>
            </li>
            <li>{t("recaptchaStep2")}</li>
            <li>{t("recaptchaStep3")}</li>
            <li>{t("recaptchaStep4")}</li>
            <li>{t("recaptchaStep5")}</li>
            <li>{t("recaptchaStep6")}</li>
            <li>{t("recaptchaStep7")}</li>
          </ul>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="button"
            disabled={!enabled || isPending}
          >
            {isPending ? t("saving") : t("save")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default RecaptchaForm;
