"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SmsConfigSchema } from "@/validations/smsConfig";
import { z } from "zod";

import TextInput from "./fields/text-input";
import Switch from "./fields/switch";
import { Button } from "../ui/button";

const SmsConfigForm = () => {
  const methods = useForm<z.infer<typeof SmsConfigSchema>>({
    resolver: zodResolver(SmsConfigSchema),
    defaultValues: {
      twilio: {
        isActive: false,
        sid: "",
        messagingSid: "",
        token: "",
        from: "",
        otpTemplate: "",
      },
      twoFactor: {
        isActive: false,
        apiKey: "",
      },
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: z.infer<typeof SmsConfigSchema>) => {
    console.log("Submitted Data", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded shadow space-y-4">
            <h3 className="font-semibold mb-2">Twilio</h3>
            <Switch name="twilio.isActive" control={control} label="Active" />
            <TextInput name="twilio.sid" label="SID" control={control} />
            <TextInput
              name="twilio.messagingSid"
              label="Messaging Service SID"
              control={control}
            />
            <TextInput name="twilio.token" label="Token" control={control} />
            <TextInput name="twilio.from" label="From" control={control} />
            <TextInput
              name="twilio.otpTemplate"
              label="OTP Template"
              control={control}
            />
          </div>

          <div className="border p-4 rounded shadow space-y-4">
            <h3 className="font-semibold mb-2">2Factor</h3>
            <Switch
              name="twoFactor.isActive"
              control={control}
              label="Active"
            />
            <TextInput
              name="twoFactor.apiKey"
              label="API Key"
              control={control}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="mt-6 flex ml-auto"
          variant="button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Update"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default SmsConfigForm;
