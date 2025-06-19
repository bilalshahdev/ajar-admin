"use client";

import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  updateFormFields,
  updateFormMeta,
} from "@/lib/store/slices/formSlice";
import { Button } from "@/components/ui/button";
import TextInput from "./fields/text-input";
import SelectInput from "./fields/select-input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  categoryId: string;
}

export default function CategoryFormBuilder({ categoryId }: Props) {
  const dispatch = useAppDispatch();

  const form = useAppSelector((s: any) =>
    s.forms.find((f: any) => f.categoryId === categoryId)
  );
  const allFields = useAppSelector((s: any) => s.fields);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: form?.name || "",
      description: form?.description || "",
      fields: form?.fields || [],
    },
  });

  const selectedFields = watch("fields");

  const onSubmit = (data: any) => {
    if (!form?._id) return;
    dispatch(
      updateFormMeta({
        ...form,
        name: data.name,
        description: data.description,
      })
    );
    dispatch(updateFormFields({ categoryId, fields: data.fields }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Form Meta Info */}
      <div className="grid sm:grid-cols-2 gap-4">
        <TextInput control={control} name="name" label="Form Name" />
        <TextInput
          control={control}
          name="description"
          label="Form Description"
        />
      </div>

      {/* Multi Field Selector */}
      <SelectInput
        control={control}
        name="fields"
        label="Attach Fields"
        isMulti
        options={allFields.map((f: any) => ({
          label: f.label,
          value: f._id,
        }))}
      />

      {/* Current Field Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Field Name</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedFields.map((fid: string, index: number) => {
            const field = allFields.find((f: any) => f._id === fid);
            if (!field) return null;
            return (
              <TableRow key={fid}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{field.label}</TableCell>
                <TableCell className="capitalize">{field.type}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Button variant="button" type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Update Form"}
      </Button>
    </form>
  );
}
