"use client";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import TextInput from "../forms/fields/text-input";

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

export default FirebaseConfigForm;
