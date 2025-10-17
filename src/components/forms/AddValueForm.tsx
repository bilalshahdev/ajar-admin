"use client";

import { Button } from "@/components/ui/button";
import { DropdownValues, ValueSchema } from "@/validations/dropdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import TextInput from "./fields/TextInput";

export function AddValueForm({ doc, addValue, adding }: any) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<DropdownValues>({
    resolver: zodResolver(ValueSchema),
    defaultValues: { name: "", value: "" },
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-end gap-2">
      <div className="flex gap-2 w-full">
        <TextInput
          label="Label"
          className="w-full"
          placeholder="Label (e.g. CNIC)"
          control={control}
          name="name"
          disabled={adding}
        />
        <TextInput
          label="Value"
          className="w-full"
          placeholder="Value (e.g. cnic)"
          control={control}
          name="value"
          disabled={adding}
        />
      </div>
      <Button type="submit" disabled={adding} className="">
        <PlusCircle className="h-4 w-4 mr-1" />
        {adding ? "Adding…" : "Add"}
      </Button>
    </form>
  );
}
