"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";
import TextInput from "./forms/fields/TextInput";
import { Button } from "./ui/button";
import Switch from "./forms/fields/Switch";
import {
  useGetDamageLiabilityTerms,
  useUpdateDamageLiabilityTerms,
} from "@/hooks/useRentalPolicies";
import Loader from "./Loader";
import ResponseError from "./ResponseError";
import { useEffect, useMemo } from "react";

interface DamageLiabilityTermsFormValues {
  responsibilityClause: string;
  inspectionRequired: boolean;
  insuranceRequired: boolean;
}

const DamageLiabilityTerms = ({ zone }: { zone: string }) => {
  const { data, isLoading, error } = useGetDamageLiabilityTerms(zone);
  const {
    responsibilityClause = "",
    inspectionRequired = false,
    insuranceRequired = false,
  } = data?.data?.damageLiabilityTerms || {};

  const initialData = useMemo(() => {
    return {
      responsibilityClause,
      inspectionRequired,
      insuranceRequired,
    };
  }, [responsibilityClause, inspectionRequired, insuranceRequired]);

  const schema = z.object({
    responsibilityClause: z.string(),
    inspectionRequired: z.boolean(),
    insuranceRequired: z.boolean(),
  });

  const methods = useForm<DamageLiabilityTermsFormValues>({
    defaultValues: initialData,
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    reset(initialData);
  }, [reset, initialData]);

  const {
    mutate: update,
    isPending: updating,
    error: updateError,
  } = useUpdateDamageLiabilityTerms();

  const onSubmit = (data: any) => {
    update({ zoneId: zone, data });
  };

  if (isLoading) return <Loader />;
  if (error) return <ResponseError error={error?.message} />;

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
          <div className="flex gap-4">
            <Switch
              name="inspectionRequired"
              label="Inspection"
              control={control}
            />
            <Switch
              name="insuranceRequired"
              label="Insurance"
              control={control}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="button"
            type="submit"
            disabled={isLoading || updating}
          >
            {updating ? "Saving..." : "Save"}
          </Button>
        </div>
        {updateError && (
          <p className="text-red-500">
            {updateError?.message || "Failed to update damage liability terms"}
          </p>
        )}
      </form>
    </FormProvider>
  );
};

export default DamageLiabilityTerms;
