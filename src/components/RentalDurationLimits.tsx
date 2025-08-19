"use client";

import {
  useGetRentalDurationLimits,
  useUpdateRentalDurationLimits,
} from "@/hooks/useRentalPolicies";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import SelectInput from "./forms/fields/SelectInput";
import Switch from "./forms/fields/Switch";
import TextInput from "./forms/fields/TextInput";
import Loader from "./Loader";
import ResponseError from "./ResponseError";
import { Button } from "./ui/button";

const durations = [
  { label: "Hours", value: "hours" },
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
  { label: "Months", value: "months" },
  { label: "Years", value: "years" },
];

const durationSchema = z.object({
  value: z.number(),
  unit: z.string(),
});

const schema = z.object({
  minimumDuration: durationSchema,
  maximumDuration: durationSchema,
  extensionAllowed: z.boolean(),
});

type RentalDurationFormValues = z.infer<typeof schema>;

const RentalDurationLimits = ({ zone }: { zone: string }) => {
  const { data, isLoading, error } = useGetRentalDurationLimits(zone);

  const {
    minimumDuration = { value: 0, unit: "days" },
    maximumDuration = { value: 0, unit: "days" },
    extensionAllowed = false,
  } = data?.data?.rentalDurationLimits || {};

  const initialData = {
    minimumDuration,
    maximumDuration,
    extensionAllowed,
  };
  const methods = useForm<RentalDurationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    if (data?.data?.rentalDurationLimits) {
      reset({
        minimumDuration,
        maximumDuration,
        extensionAllowed,
      });
    }
  }, [reset, data, minimumDuration, maximumDuration, extensionAllowed]);

  const {
    mutate: update,
    isPending: updating,
    error: updateError,
  } = useUpdateRentalDurationLimits();

  const onSubmit = (data: RentalDurationFormValues) => {
    update({ zoneId: zone, data });
  };

  if (isLoading) return <Loader />;
  if (error) return <ResponseError error={error?.message} />;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <label className="font-semibold mb-1 block">Minimum Duration</label>
            <div className="flex items-center gap-2">
              <TextInput
                name="minimumDuration.value"
                control={control}
                type="number"
                min={1}
              />
              <SelectInput
                name="minimumDuration.unit"
                control={control}
                options={durations}
                labelKey="label"
                valueKey="value"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Set minimum length of a rental period
            </p>
          </div>

          <div>
            <label className="font-semibold mb-1 block">Maximum Duration</label>
            <div className="flex items-center gap-2">
              <TextInput
                name="maximumDuration.value"
                control={control}
                type="number"
              />
              <SelectInput
                name="maximumDuration.unit"
                control={control}
                options={durations}
                labelKey="label"
                valueKey="value"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Set maximum length of a rental period
            </p>
          </div>

          <Switch
            name="extensionAllowed"
            label="Extension Allowed"
            control={control}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="button"
            disabled={isLoading || updating}
          >
            {updating ? "Saving..." : "Save"}
          </Button>
        </div>
        {updateError && (
          <p className="text-red-500">
            {updateError?.message || "Failed to update rental duration limits"}
          </p>
        )}
      </form>
    </FormProvider>
  );
};

export default RentalDurationLimits;
