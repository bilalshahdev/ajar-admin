"use client";

import { useForm, useWatch } from "react-hook-form";
import CommissionInputs from "../forms/fields/comission-inputs";
import DateInput from "../forms/fields/date-input";
import TextInput from "../forms/fields/text-input";
import Loader from "../loader";
import { Button } from "../ui/button";
import SubCategorySelector from "../subcategory-selector";

const ZoneSettings = () => {
  const defaultValues = {
    zone: "",
    subcategory: "",
    fields: [],
    name: "",
    description: "",
    settings: {
      commissionType: "percentage",
      leaserCommission: {
        value: 0,
        min: 0,
        max: 0,
      },
      renterCommission: {
        value: 0,
        min: 0,
        max: 0,
      },
      tax: 0,
      expiry: "",
    },
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <SubCategorySelector control={control} name="subcategory" />
      <SubcategorySettingsForm control={control} isSubmitting={isSubmitting} />
    </form>
  );
};

export default ZoneSettings;

const SubcategorySettingsForm = ({
  control,
  isSubmitting,
}: {
  control: any;
  isSubmitting: boolean;
}) => {
  const subcategory = useWatch({
    control,
    name: "subcategory",
  });
  const selected = useWatch({
    control,
    name: "subcategory",
  });
  return (
    <>
      {subcategory && selected.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <CommissionInputs control={control} className="col-span-2" />
            <DateInput
              control={control}
              name="settings.expiry"
              label="Expiry"
              note="to Accept the request"
            />
            <div className="col-span-2 md:col-span-1">
            <TextInput
              control={control}
              name="settings.tax"
              type="number"
              label="Tax"
              note="Tax percentage"
            />
            </div>
          </div>
          <Button variant="button" disabled={isSubmitting} type="submit">
            {isSubmitting ? <Loader /> : "Submit"}
          </Button>
        </>
      ) : (
        <p className="text-muted-foreground">
          Please select a subcategory for its settings
        </p>
      )}
    </>
  );
};
