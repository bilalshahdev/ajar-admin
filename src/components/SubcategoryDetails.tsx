"use client";

import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import FieldsSelector from "./forms/fields/FieldSelector";
import CommissionInputs from "./forms/fields/CommissionInputs";
import TextInput from "./forms/fields/TextInput";

interface SubCategoryDetailProps {
  index: number;
  subcategoryId: string;
  subcategoryName?: string; // optional, for label
}

const SubCategoryDetail = ({
  index,
  subcategoryId,
  subcategoryName,
}: SubCategoryDetailProps) => {
  const { control } = useFormContext();

  return (
    <div className="border border-muted p-4 mt-4 rounded-md space-y-4 bg-muted/20">
      <Label className="text-base font-semibold">
        {subcategoryName || `Subcategory ${index + 1}`}
      </Label>

      {/* 1. Fields Multi-select */}
      <FieldsSelector index={index} />

      {/* 2. Commission Inputs */}
      <CommissionInputs control={control} prefix="commission" />
      <CommissionInputs control={control} prefix="renterCommission" />

      {/* 3. Tax */}
      <TextInput
        control={control}
        name={`subcategories.${index}.tax`}
        type="number"
        label="Tax"
        note="Numeric tax value"
      />

      {/* 4. Expiry */}
      <TextInput
        control={control}
        name={`subcategories.${index}.expiry`}
        type="text"
        label="Expiry"
        note="Can be a date or duration depending on your logic"
      />
    </div>
  );
};

export default SubCategoryDetail;
