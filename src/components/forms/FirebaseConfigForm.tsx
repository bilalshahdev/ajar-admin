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

const FirebaseConfigForm = () => {
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
          <Button type="submit" variant="button" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default FirebaseConfigForm;
