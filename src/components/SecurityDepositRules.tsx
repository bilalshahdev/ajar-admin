"use client";

import {
  useGetSecurityDepositRules,
  useUpdateSecurityDepositRules,
} from "@/hooks/useRentalPolicies";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Switch from "./forms/fields/Switch";
import TextInput from "./forms/fields/TextInput";
import { Button } from "./ui/button";
import Loader from "./Loader";
import ResponseError from "./ResponseError";
import { useEffect } from "react";

interface SecurityDepositRulesFormValues {
  depositRequired: boolean;
  depositAmount: number;
  depositConditions: string;
}

const SecurityDepositRules = ({ zone }: { zone: string }) => {
  const { data, isLoading, error } = useGetSecurityDepositRules(zone);

  const {
    depositRequired = false,
    depositAmount = 0,
    depositConditions = "",
  } = data?.data?.securityDepositRules || {};

  const initialData = {
    depositRequired,
    depositAmount,
    depositConditions,
  };

  const schema = z.object({
    depositRequired: z.boolean(),
    depositAmount: z.number(),
    depositConditions: z.string(),
  });

  const methods = useForm<SecurityDepositRulesFormValues>({
    defaultValues: initialData,
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    reset({
      depositRequired,
      depositAmount,
      depositConditions,
    });
  }, [reset, depositRequired, depositAmount, depositConditions]);

  const {
    mutate: update,
    isPending: updating,
    error: updateError,
  } = useUpdateSecurityDepositRules();

  const onSubmit = (data: any) => {
    update({ zoneId: zone, data });
  };

  if (isLoading) return <Loader />;
  if (error) return <ResponseError error={error?.message} />;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Switch
            name="depositRequired"
            label="Deposit Required"
            control={control}
          />
          <TextInput
            name="depositAmount"
            label="Deposit Amount"
            control={control}
            placeholder="Enter Deposit Amount"
          />
          <TextInput
            name="depositConditions"
            label="Deposit Conditions"
            control={control}
            placeholder="Enter Deposit Conditions"
            type="textarea"
            className="col-span-2"
          />
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
            {updateError?.message || "Failed to update security deposit rules"}
          </p>
        )}
      </form>
    </FormProvider>
  );
};

export default SecurityDepositRules;
