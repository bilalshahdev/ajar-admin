"use client";

import { RootState } from "@/lib/store";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import SelectInput from "./fields/select-input";
import Switch from "./fields/switch";
import TextInput from "./fields/text-input";
import { Button } from "../ui/button";
import { H4 } from "../typography";
import { Separator } from "../ui/separator";

const RefundPoliciesForm = () => {
  const zones = useSelector((state: RootState) => state.zones);
  const categories = useSelector((state: RootState) => state.categories);

  const methods = useForm({
    defaultValues: {
      zone: "",
      subCategory: "",
      allowRefund: false,
      refundWindow: "",
      cancellationCutoffTime: {
        days: 0,
        hours: 0,
      },
      flatFee: {
        amount: 0,
        days: 0,
        hours: 0,
      },
      noteText: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: any) => {
    console.log("Refund Policy Submitted:", data);
    // Send data to API
  };

  const zone = useWatch({
    control,
    name: "zone",
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Zone & Category */}
          <SelectInput
            name="zone"
            label="Zone"
            control={control}
            options={zones}
            labelKey="name"
            valueKey="_id"
          />
          <SelectInput
            disabled={!zone}
            name="subCategory"
            label="Sub Category"
            control={control}
            options={categories}
            labelKey="name"
            valueKey="_id"
          />

          {/* Allow Refund */}
          <Switch name="allowRefund" label="Allow Refund" control={control} />

          {/* Cancellation Cutoff Time */}
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              name="cancellationCutoffTime.days"
              label="Cutoff Time (Days)"
              type="number"
              control={control}
              placeholder="Days"
              min={0}
            />
            <TextInput
              name="cancellationCutoffTime.hours"
              label="(Hours)"
              type="number"
              control={control}
              placeholder="Hours"
              min={0}
            />
          </div>

          {/* Flat Fee Fields */}
          <Separator className="md:col-span-2 mt-4" />
          <div className="space-y-2 grid md:col-span-2">
            <H4>Flat Fee</H4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                name="flatFee.amount"
                label="Amount ($)"
                type="number"
                control={control}
                placeholder="Amount"
                min={0}
              />
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  name="flatFee.days"
                  label="Time (Days)"
                  type="number"
                  control={control}
                  placeholder="Days"
                  min={0}
                />
                <TextInput
                  name="flatFee.hours"
                  label="Time (Hours)"
                  type="number"
                  control={control}
                  placeholder="Hours"
                  min={0}
                />
              </div>
            </div>
            <Separator className="mt-4" />
          </div>
          {/* Notes */}
          <TextInput
            name="noteText"
            label="Note Text"
            control={control}
            placeholder="Enter Note Text"
            type="textarea"
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          {/* <Button type="button" variant="outline">
            Reset
          </Button> */}
          <Button type="submit" variant="button" disabled={isSubmitting}>
            Save Information
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default RefundPoliciesForm;
