"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownValues, ValueSchema } from "@/validations/dropdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import TextInput from "./fields/TextInput";
import { useTranslations } from "next-intl";

export function AddValueForm({ doc, addValue, adding }: any) {
  const t = useTranslations("translation");

  const isDocumentType = ["leaserDocuments", "renterDocuments","userDocuments"].includes(doc.name);

  const { handleSubmit, control, reset } = useForm<DropdownValues>({
    resolver: zodResolver(ValueSchema),
    defaultValues: {
      name: "",
      value: "",
      hasExpiry: false,
      autoApproval: false,
    },
  });

  const onSubmit = async (data: DropdownValues) => {
    try {
      await addValue({
        name: doc.name,
        value: data,
      });
      reset();
    } catch (err) {
      console.error("Server error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
      {/* Inputs Row */}
      <div className="flex items-end gap-2 w-full">
        <div className="flex gap-2 w-full">
          <TextInput
            label="label"
            className="w-full"
            placeholder={t("egCnic")}
            control={control}
            name="name"
            disabled={adding}
          />
          <TextInput
            label="value"
            className="w-full"
            placeholder={t("egCnicSmall")}
            control={control}
            name="value"
            disabled={adding}
          />
        </div>

        <Button type="submit" disabled={adding} className="mb-[1px]">
          <PlusCircle className="h-4 w-4 mr-1" />
          {adding ? t("adding") : t("addBtn")}
        </Button>
      </div>

      {/* Checkboxes Row (No FormField required) */}
      {isDocumentType && (
        <div className="flex gap-6 items-center px-1">
          {/* Has Expiry */}
          <Controller
            control={control}
            name="hasExpiry"
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasExpiry"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={adding}
                />
                <label
                  htmlFor="hasExpiry"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {t("hasExpiry")}
                </label>
              </div>
            )}
          />

          {/* Auto Approval */}
          <Controller
            control={control}
            name="autoApproval"
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoApproval"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={adding}
                />
                <label
                  htmlFor="autoApproval"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {t("autoApproval")}
                </label>
              </div>
            )}
          />
        </div>
      )}
    </form>
  );
}