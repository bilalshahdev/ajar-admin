"use client";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import TextInput from "../forms/fields/text-input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Switch from "../forms/fields/switch";
import { Textarea } from "../ui/textarea";

const FirebaseConfig = () => {
  return (
    <div className="border rounded-md p-4">
      <Tabs defaultValue="firebase-config">
        <TabsList className="mb-4">
          <TabsTrigger value="firebase-config" className="cursor-pointer">
            Firebase config
          </TabsTrigger>
          <TabsTrigger value="push-notification" className="cursor-pointer">
            Push Notification
          </TabsTrigger>
        </TabsList>
        <TabsContent value="push-notification">
          <PushNotificationForm />
        </TabsContent>
        <TabsContent value="firebase-config">
          <FirebaseConfigForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FirebaseConfig;

// firebase config form

const FirebaseConfigForm = () => {
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

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: any) => {
    console.log("Firebase Config Submitted:", data);
    // send to API
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TextInput
          name="serviceFile"
          label="Service file content"
          control={control}
          placeholder="Paste your service JSON here"
        />
        <div className="grid md:grid-cols-3 gap-4">
          <TextInput
            name="apiKey"
            label="API KEY"
            control={control}
            placeholder="Enter API KEY"
          />
          <TextInput
            name="projectId"
            label="FCM PROJECT ID"
            control={control}
            placeholder="Enter FCM PROJECT ID"
          />
          <TextInput
            name="authDomain"
            label="Auth Domain"
            control={control}
            placeholder="Enter Auth Domain"
          />
          <TextInput
            name="storageBucket"
            label="Storage Bucket"
            control={control}
            placeholder="Enter Storage Bucket"
          />
          <TextInput
            name="messagingSenderId"
            label="Messaging Sender Id"
            control={control}
            placeholder="Enter Messaging Sender Id"
          />
          <TextInput
            name="appId"
            label="App Id"
            control={control}
            placeholder="Enter App Id"
          />
          <TextInput
            name="measurementId"
            label="Measurement Id"
            control={control}
            placeholder="Enter Measurement Id"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="submit" variant="button" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

const messagesEN = [
  { key: "bookingPending", label: "Booking Pending Message" },
  { key: "bookingConfirmed", label: "Booking Confirmation Message" },
  { key: "bookingProcessing", label: "Booking Processing Message" },
  { key: "bookingDelivered", label: "Booking Delivered Message" },
  { key: "bookingCanceled", label: "Booking Canceled Message" },
  { key: "refundCanceled", label: "Refund Request Canceled Message" },
  // Add more based on image...
];

const PushNotificationForm = () => {
  const methods = useForm({
    defaultValues: {
      language: "en",
      messages: messagesEN.map((msg) => ({
        key: msg.key,
        label: msg.label,
        enabled: true,
        value: "",
      })),
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const { fields } = useFieldArray({ control, name: "messages" });

  const onSubmit = (data: any) => {
    console.log("Push Notifications:", data);
    // submit to backend
  };

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
                  label=""
                />
              </div>
              <Textarea
                {...methods.register(`messages.${idx}.value`)}
                placeholder="Write your message..."
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <Button type="submit" variant="button" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
