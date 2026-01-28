"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useMemo } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

import {
  useAddDropdown,
  useGetDropdownByName,
  useUpdateDropdown,
} from "@/hooks/useDropdowns";
import type { Dropdown } from "@/types";
import { DropdownFormValues, DropdownSchema } from "@/validations/dropdown";

export default function DropdownForm({ name }: { name?: string }) {
  const router = useRouter();
  const isEdit = Boolean(name);

  const { data: fetched, isLoading } = useGetDropdownByName(name!, isEdit);
  const doc: Dropdown | undefined = useMemo(
    () => fetched?.data as Dropdown,
    [fetched]
  );

  const { mutateAsync: addDropdown, isPending: creating } = useAddDropdown();
  const { mutateAsync: patchDropdown, isPending: updating } =
    useUpdateDropdown();

  const form = useForm<DropdownFormValues>({
    resolver: zodResolver(DropdownSchema),
    defaultValues: { name: "", values: [{ name: "", value: "" }] },
    mode: "onChange",
  });

  const { control, handleSubmit, formState, reset } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "values" });

  // hydrate on edit
  useEffect(() => {
    if (isEdit && doc) {
      reset({
        name: doc.name ?? "",
        values: doc.values?.length ? doc.values : [{ name: "", value: "" }],
      });
    }
  }, [isEdit, doc, reset]);

  const pending =
    formState.isSubmitting || creating || updating || (isEdit && isLoading);

  const onSubmit = async (values: DropdownFormValues) => {
    // normalize
    const payload = {
      name: values.name.trim().toLowerCase(),
      values: values.values.map((v) => ({
        name: v.name.trim(),
        value: v.value.trim().toLowerCase(),
      })),
    };

    if (isEdit && doc?._id) {
      await patchDropdown({ id: doc._id, data: payload });
    } else {
      await addDropdown(payload as any);
    }
    startTransition(() => router.replace("/dropdowns"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardContent className="space-y-6 pt-6">
          {/* key/name */}
          <div className="space-y-2">
            <Label htmlFor="name">Key</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    id="name"
                    placeholder="e.g. reasons, server-categories"
                    {...field}
                    disabled={pending}
                  />
                  {formState.errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {formState.errors.name.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* values */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Values</Label>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => append({ name: "", value: "" })}
                disabled={pending}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Value
              </Button>
            </div>

            <div className="grid gap-3">
              {fields.map((f, idx) => (
                <div
                  key={f.id}
                  className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-3 items-start"
                >
                  <Controller
                    name={`values.${idx}.name`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="Display name (e.g. Slow Speed)"
                        {...field}
                        disabled={pending}
                      />
                    )}
                  />
                  <Controller
                    name={`values.${idx}.value`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="Key (e.g. slow_speed)"
                        {...field}
                        disabled={pending}
                      />
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="md:justify-self-end"
                    onClick={() => remove(idx)}
                    disabled={pending || fields.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="md:col-span-3 -mt-1">
                    {formState.errors.values?.[idx]?.name && (
                      <p className="text-xs text-destructive">
                        {formState.errors.values[idx]?.name?.message as string}
                      </p>
                    )}
                    {formState.errors.values?.[idx]?.value && (
                      <p className="text-xs text-destructive">
                        {formState.errors.values[idx]?.value?.message as string}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {typeof formState.errors.values?.message === "string" && (
              <p className="text-sm text-destructive">
                {formState.errors.values.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={pending || !formState.isValid}>
          {isEdit ? "Update Dropdown" : "Create Dropdown"}
        </Button>
      </div>
    </form>
  );
}
