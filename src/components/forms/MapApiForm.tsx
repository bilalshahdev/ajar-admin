"use client";

import { MapApiSchema } from "@/validations/mapApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  useGetBusinessSettings,
  useSaveBusinessSettings,
} from "@/hooks/useBusinessSettings";
import { useEffect } from "react";
import MapApiFormSkeleton from "../skeletons/MapApiFormSkeleton";
import TextInput from "./fields/TextInput";
import { useTranslations } from "next-intl";

const MapApiForm = () => {
  const t = useTranslations("translation");
  const { data, isLoading } = useGetBusinessSettings("mapAPI");
  const mapApi = data?.data?.pageSettings;

  const methods = useForm<z.infer<typeof MapApiSchema>>({
    resolver: zodResolver(MapApiSchema),
    defaultValues: {
      clientKey: "",
      serverKey: "",
    },
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    if (mapApi) {
      reset(mapApi);
    }
  }, [mapApi, reset]);

  const { mutate: saveMapApi, isPending } = useSaveBusinessSettings("mapAPI");

  const onSubmit = (data: z.infer<typeof MapApiSchema>) => {
    saveMapApi(data);
  };

  if (isLoading) {
    return <MapApiFormSkeleton />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <TextInput
            name="clientKey"
            label="mapApiKeyClient"
            control={control}
            placeholder={t("enterMapApiKeyClient")}
          />

          <TextInput
            name="serverKey"
            label="mapApiKeyServer"
            control={control}
            placeholder={t("enterMapApiKeyServer")}
          />
        </div>

        <div className="flex justify-end">
          <Button variant="button" type="submit" disabled={isPending}>
            {isPending ? t("saving") : t("save")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default MapApiForm;
