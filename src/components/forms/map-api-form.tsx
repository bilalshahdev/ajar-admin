"use client";

import { MapApiSchema } from "@/validations/mapApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import TextInput from "./fields/text-input";

const MapApiForm = () => {
  const methods = useForm<z.infer<typeof MapApiSchema>>({
    resolver: zodResolver(MapApiSchema),
    defaultValues: {
      clientKey: "",
      serverKey: "",
    },
  });

  const { handleSubmit, control } = methods;

  const onSubmit = (data: z.infer<typeof MapApiSchema>) => {
    console.log("Map API Config:", data);
    // Call backend mutation
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <TextInput
            name="clientKey"
            label="Map API Key (Client)"
            control={control}
            placeholder="Enter Map API Key (Client)"
          />
          <TextInput
            name="serverKey"
            label="Map API Key (Server)"
            control={control}
            placeholder="Enter Map API Key (Server)"
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

export default MapApiForm;
