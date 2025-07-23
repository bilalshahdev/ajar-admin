"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";
import TextInput from "./forms/fields/text-input";
import { Button } from "./ui/button";
import Switch from "./forms/fields/switch";

const DamageLiabilityTerms = ({ zone }: { zone: string }) => {
  const initialData = {
    zoneId: zone,
    responsibilityClause: "",
    inspection: false,
    insurance: false,
  };

  interface DamageLiabilityTermsFormValues {
    zoneId: string;
    responsibilityClause: string;
    inspection: boolean;
    insurance: boolean;
  }

  const schema = z.object({
    zoneId: z.string(),
    responsibilityClause: z.string(),
    inspection: z.boolean(),
    insurance: z.boolean(),
  });

  const methods = useForm<DamageLiabilityTermsFormValues>({
    defaultValues: initialData,
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: any) => {
    console.log("Security Deposit Submitted:", data);
    // Send data to API
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <TextInput
            name="responsibilityClause"
            label="Responsibility Clause"
            control={control}
            placeholder="Enter Responsibility Clause"
            type="textarea"
          />
          {/* deposit required, label, with yes or no checkbox */}
          <div className="flex gap-4">
            <Switch name="inspection" label="Inspection" control={control} />
            <Switch name="insurance" label="Insurance" control={control} />
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default DamageLiabilityTerms;
