"use client";
import { SocialLoginSchema } from "@/validations/socials";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Control } from "react-hook-form";
import { Button } from "../ui/button";
import FileInput from "./fields/FileInput";
import Switch from "./fields/Switch";
import TextInput from "./fields/TextInput";

import {
  useGetBusinessSettings,
  useSaveBusinessSettings,
} from "@/hooks/useBusinessSettings";
import { useEffect } from "react";
import { SocialConfigFormSkeleton } from "../skeletons/SocialConfigFormSkeleton";
import { useTranslations } from "next-intl";

const SocialConfigForm = () => {
  const t = useTranslations("translation");
  const { data, isLoading } = useGetBusinessSettings("socialLogins");
  const socialLogin = data?.data?.pageSettings;

  const methods = useForm<z.infer<typeof SocialLoginSchema>>({
    resolver: zodResolver(SocialLoginSchema),
    defaultValues: {
      google: {
        enabled: false,
        callbackUrl: "",
        clientId: "",
        clientSecret: "",
      },
      facebook: {
        enabled: false,
        callbackUrl: "",
        clientId: "",
        clientSecret: "",
      },
      apple: {
        enabled: false,
        clientId: "",
        teamId: "",
        keyId: "",
        serviceFile: null,
      },
    },
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    if (socialLogin) {
      reset(socialLogin);
    }
  }, [socialLogin, reset]);

  const {
    mutate: saveSocialLogin,
    isPending,
    error: saveError,
  } = useSaveBusinessSettings("socialLogins");

  const onSubmit = (data: z.infer<typeof SocialLoginSchema>) => {
    saveSocialLogin(data);
  };

  if (isLoading) {
    return <SocialConfigFormSkeleton />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProviderBlock
            title="google"
            switchName="google.enabled"
            control={control}
            fields={[
              { name: "google.callbackUrl", label: "callbackUrl" },
              { name: "google.clientId", label: "clientId" },
              { name: "google.clientSecret", label: "clientSecret" },
            ]}
          />
          <ProviderBlock
            title="facebook"
            switchName="facebook.enabled"
            control={control}
            fields={[
              { name: "facebook.callbackUrl", label: "callbackUrl" },
              { name: "facebook.clientId", label: "clientId" },
              { name: "facebook.clientSecret", label: "clientSecret" },
            ]}
          />
          <ProviderBlock
            title="apple"
            switchName="apple.enabled"
            control={control}
            fields={[
              { name: "apple.clientId", label: "clientId" },
              { name: "apple.teamId", label: "teamId" },
              { name: "apple.keyId", label: "keyId" },
            ]}
            fileField={{ name: "apple.serviceFile", label: "serviceFile" }}
          />
        </div>

        <div className="flex justify-end">
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

export default SocialConfigForm;

interface Field {
  label: string;
  name: string;
  type?: string;
}

interface ProviderBlockProps {
  title: string;
  switchName: string;
  fields: Field[];
  control: Control<any>;
  fileField?: Field;
  onReset?: () => void;
  onSubmit?: () => void;
}

const ProviderBlock = ({
  title,
  switchName,
  fields,
  control,
  fileField,
}: ProviderBlockProps) => {
  const t = useTranslations("translation");
  const switchValue = useWatch({ control, name: switchName });

  return (
    <div className="border rounded shadow">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="font-semibold">{t(title)}</h3>
        <Switch name={switchName} control={control} label="enable" />
      </div>

      <div className="p-4 space-y-4">
        {fields.map((field) => (
          <TextInput
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={t(`enter${field.label.charAt(0).toUpperCase() + field.label.slice(1)}`)}
            control={control}
            type={field.type as any}
            disabled={!switchValue}
          />
        ))}

        {fileField && (
          <FileInput
            name={fileField.name}
            label={fileField.label}
            placeholder={t(`upload${fileField.label.charAt(0).toUpperCase() + fileField.label.slice(1)}`)}
            control={control}
            disabled={!switchValue}
          />
        )}
      </div>
    </div>
  );
};

// export default ProviderBlock;
