"use client";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import TextInput from "../forms/fields/TextInput";
import {
  useGetBusinessSettings,
  useSaveBusinessSettings,
} from "@/hooks/useBusinessSettings";
import FirebaseConfigFormSkeleton from "../skeletons/FirebaseConfigFormSkeleton";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

const FirebaseConfigForm = () => {
  const t = useTranslations("translation");
  const { data, isLoading } = useGetBusinessSettings("firebase");
  const pageSettings = data?.data?.pageSettings;
  const firebase = pageSettings?.firebaseConfig;

  const methods = useForm({
    defaultValues: {
      serviceFile: "",
      apiKey: "",
      projectId: "",
      authDomain: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: "",
    },
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    if (firebase) {
      reset(firebase);
    }
  }, [firebase, reset]);

  const { mutate, isPending } = useSaveBusinessSettings("firebase");

  const onSubmit = (data: any) => {
    mutate({ ...pageSettings, firebaseConfig: data });
  };

  if (isLoading) {
    return <FirebaseConfigFormSkeleton />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TextInput
          name="serviceFile"
          label="serviceFileContent"
          control={control}
          placeholder={t("pasteServiceJson")}
        />
        <div className="grid md:grid-cols-3 gap-4">
          <TextInput
            name="apiKey"
            label="apiKey"
            control={control}
            placeholder={t("enterApiKey")}
          />
          <TextInput
            name="projectId"
            label="fcmProjectId"
            control={control}
            placeholder={t("enterFcmProjectId")}
          />
          <TextInput
            name="authDomain"
            label="authDomain"
            control={control}
            placeholder={t("enterAuthDomain")}
          />
          <TextInput
            name="storageBucket"
            label="storageBucket"
            control={control}
            placeholder={t("enterStorageBucket")}
          />
          <TextInput
            name="messagingSenderId"
            label="messagingSenderId"
            control={control}
            placeholder={t("enterMessagingSenderId")}
          />
          <TextInput
            name="appId"
            label="appId"
            control={control}
            placeholder={t("enterAppId")}
          />
          <TextInput
            name="measurementId"
            label="measurementId"
            control={control}
            placeholder={t("enterMeasurementId")}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="submit" variant="button" disabled={isPending}>
            {isPending ? t("saving") : t("save")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default FirebaseConfigForm;
