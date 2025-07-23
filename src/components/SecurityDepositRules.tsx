"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";
import TextInput from "./forms/fields/text-input";
import { Button } from "./ui/button";
import Switch from "./forms/fields/switch";

const SecurityDepositRules = ({ zone }: { zone: string }) => {
  const initialData = {
    zoneId: zone,
    deposit: false,
    depositAmount: 0,
    depositConditions: "",
  };

  interface SecurityDepositRulesFormValues {
    zoneId: string;
    deposit: boolean;
    depositAmount: number;
    depositConditions: string;
  }

  const schema = z.object({
    zoneId: z.string(),
    deposit: z.boolean(),
    depositAmount: z.number(),
    depositConditions: z.string(),
  });

  const methods = useForm<SecurityDepositRulesFormValues>({
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
        <div className="grid md:grid-cols-2 gap-4">
          {/* deposit required, label, with yes or no checkbox */}
          <Switch
            name="deposit"
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
          <Button variant="button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SecurityDepositRules;
