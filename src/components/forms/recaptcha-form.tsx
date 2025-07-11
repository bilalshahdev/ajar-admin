"use client";

import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecaptchaSchema } from "@/validations/recaptcha";
import { z } from "zod";

import Switch from "./fields/switch";
import TextInput from "./fields/text-input";
import { Button } from "../ui/button";
import Link from "next/link";

const RecaptchaForm = () => {
  const methods = useForm<z.infer<typeof RecaptchaSchema>>({
    resolver: zodResolver(RecaptchaSchema),
    defaultValues: {
      enabled: false,
      siteKey: "",
      secretKey: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: z.infer<typeof RecaptchaSchema>) => {
    console.log("ReCaptcha Config:", data);
  };
  const enabled = useWatch({ control, name: "enabled" });
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 border rounded-lg p-6"
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recaptcha Credential Setups</h2>

          <Switch name="enabled" control={control} label="Turn OFF" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              name="siteKey"
              label="Site Key"
              control={control}
              placeholder="Enter reCAPTCHA site key"
              disabled={!enabled}
            />
            <TextInput
              name="secretKey"
              label="Secret Key"
              control={control}
              placeholder="Enter reCAPTCHA secret key"
              disabled={!enabled}
            />
          </div>

          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>
              Go to the Credentials page (
              <Link
                className="text-blue-500 underline"
                href="https://www.google.com/recaptcha/admin"
                target="_blank"
              >
                Click Here
              </Link>
              )
            </li>
            <li>
              Add a <strong>Label</strong> (Ex: Test Label)
            </li>
            <li>
              Select reCAPTCHA v2 as <strong>reCAPTCHA Type</strong> (Sub type:
              I’m not a robot Checkbox)
            </li>
            <li>
              Add <strong>Domain</strong> (e.g. https://www.example.com)
            </li>
            <li>
              Check in <strong>Accept the reCAPTCHA Terms of Service</strong>
            </li>
            <li>
              Press <strong>Submit</strong>
            </li>
            <li>
              Copy <strong>Site Key</strong> and <strong>Secret Key</strong>,
              then paste below and click Save.
            </li>
          </ul>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="button"
            disabled={!enabled || isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default RecaptchaForm;
