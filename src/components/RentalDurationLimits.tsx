"use client";

import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import Switch from "./forms/fields/Switch";
import TextInput from "./forms/fields/TextInput";
import SelectInput from "./forms/fields/SelectInput";

const durations = [
  { label: "Hours", value: "hours" },
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
  { label: "Months", value: "months" },
  { label: "Years", value: "years" },
];

const yesNoOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const schema = z.object({
  zoneId: z.string(),
  minDuration: z.number(),
  minDurationUnit: z.string(),
  maxDuration: z.number(),
  maxDurationUnit: z.string(),
  extensionAllowed: z.string(),
  extensionToggle: z.boolean(),
});

type RentalDurationFormValues = z.infer<typeof schema>;

const RentalDurationLimits = ({ zone }: { zone: string }) => {
  const methods = useForm<RentalDurationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      zoneId: zone,
      minDuration: 1,
      minDurationUnit: "days",
      maxDuration: 1,
      maxDurationUnit: "days",
      extensionAllowed: "yes",
      extensionToggle: true,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: RentalDurationFormValues) => {
    console.log("Rental Duration Data", data);
    // Send to API
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <label className="font-semibold mb-1 block">Minimum Duration</label>
            <div className="flex items-center gap-2">
              <TextInput name="minDuration" control={control} type="number" min={1} />
              <SelectInput
                name="minDurationUnit"
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

          {/* Maximum Duration */}
          <div>
            <label className="font-semibold mb-1 block">Maximum Duration</label>
            <div className="flex items-center gap-2">
              <TextInput name="maxDuration" control={control} type="number" />
              <SelectInput
                name="maxDurationUnit"
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
            name="extensionToggle"
            label="Extension Allowed"
            control={control}
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

export default RentalDurationLimits;
