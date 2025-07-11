"use client";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocialLoginSchema } from "@/validations/socials";
import { z } from "zod";

import TextInput from "./fields/text-input";
import FileInput from "./fields/file-input";
import Switch from "./fields/switch";
import { Button } from "../ui/button";
import { Control } from "react-hook-form";

const SocialConfigForm = () => {
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

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: z.infer<typeof SocialLoginSchema>) => {
    console.log("Submitted social logins:", data);
    // Submit all in one
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProviderBlock
            title="Google"
            switchName="google.enabled"
            control={control}
            fields={[
              { name: "google.callbackUrl", label: "Callback URL" },
              { name: "google.clientId", label: "Client ID" },
              { name: "google.clientSecret", label: "Client Secret" },
            ]}
          />
          <ProviderBlock
            title="Facebook"
            switchName="facebook.enabled"
            control={control}
            fields={[
              { name: "facebook.callbackUrl", label: "Callback URL" },
              { name: "facebook.clientId", label: "Client ID" },
              { name: "facebook.clientSecret", label: "Client Secret" },
            ]}
          />
          <ProviderBlock
            title="Apple"
            switchName="apple.enabled"
            control={control}
            fields={[
              { name: "apple.clientId", label: "Client ID" },
              { name: "apple.teamId", label: "Team ID" },
              { name: "apple.keyId", label: "Key ID" },
            ]}
            fileField={{ name: "apple.serviceFile", label: "Service File" }}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="button" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
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
  const switchValue = useWatch({ control, name: switchName });
  return (
    <div className="border  rounded shadow">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="font-semibold">{title}</h3>
        <Switch name={switchName} control={control} label="Enable" />
      </div>

      <div className="p-4 space-y-4">
        {fields.map((field) => (
          <TextInput
            key={field.name}
            name={field.name}
            label={field.label}
            control={control}
            type={field.type as any}
            disabled={!switchValue}
          />
        ))}

        {fileField && (
          <FileInput
            name={fileField.name}
            label={fileField.label}
            control={control}
            disabled={!switchValue}
          />
        )}
      </div>
    </div>
  );
};

// export default ProviderBlock;
