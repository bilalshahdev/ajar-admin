"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextInput from "../forms/fields/text-input";
import Switch from "../forms/fields/switch";
import { Button } from "@/components/ui/button";
import { SmtpMailSchema } from "@/validations/smtpConfig";
import SelectInput from "../forms/fields/select-input";

const testMailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

// -------------------- Main Component --------------------
const SmtpConfig = () => {
  return (
    <div className="border rounded-md p-4">
      <Tabs defaultValue="mail-config">
        <TabsList>
          <TabsTrigger value="mail-config" className="cursor-pointer">
            Mail Config
          </TabsTrigger>
          <TabsTrigger value="send-test" className="cursor-pointer">
            Send Test Mail
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mail-config">
          <SmtpMailConfigForm />
        </TabsContent>

        <TabsContent value="send-test">
          <TestMailForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmtpConfig;

//
// -------------------- SMTP Mail Config Form --------------------
const SmtpMailConfigForm = () => {
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

  const { handleSubmit, control } = methods;

  const onSubmit = (data: z.infer<typeof SmtpMailSchema>) => {
    console.log("SMTP Config Submitted:", data);
    // API call/mutation here
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <Switch name="enabled" control={control} label="Enable Mail" />

        <div className="grid md:grid-cols-2 gap-4">
          <TextInput name="mailerName" label="Mailer Name" control={control} />
          <TextInput name="driver" label="Driver" control={control} />
          <TextInput name="host" label="Host" control={control} />
          <TextInput name="port" label="Port" control={control} type="number" />
          <TextInput name="userName" label="User Name" control={control} />
          <TextInput name="email" label="Email ID" control={control} />
          <TextInput name="password" label="Password" control={control} />
          <SelectInput
            name="encryption"
            control={control}
            label="Encryption"
            options={[
              { label: "TLS", value: "tls" },
              { label: "SSL", value: "ssl" },
              { label: "None", value: "none" },
            ]}
          />
        </div>

        <div className="flex justify-end">
          <Button
            variant="button"
            type="submit"
            disabled={methods.formState.isSubmitting}
          >
            {methods.formState.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

//
// -------------------- Test Mail Form --------------------
const TestMailForm = () => {
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
          label="Email"
          control={control}
          placeholder="e.g. test@example.com"
        />

        <div className="flex justify-end">
          <Button
            variant="button"
            type="submit"
            disabled={methods.formState.isSubmitting}
          >
            {methods.formState.isSubmitting ? "Sending..." : "Send Mail"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
