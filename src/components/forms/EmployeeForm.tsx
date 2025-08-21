"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/store/hooks";
import { EmployeeFormValues, EmployeeSchema } from "@/validations/employee";

import FileInput from "./fields/FileInput";
import PasswordInput from "./fields/PasswordInput";
import SelectInput from "./fields/SelectInput";
import TextInput from "./fields/TextInput";

const roles = [
  { label: "Zone Manager", value: "zone-manager" },
  { label: "Category Manager", value: "category-manager" },
  { label: "Form Manager", value: "form-manager" },
];

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Blocked", value: "blocked" },
];

const moduleOptions = [
  "zones",
  "categories",
  "forms",
  "refunds",
  "reports",
  "settings",
  "users",
];

const permissionOptions = ["read", "write", "update", "delete"];

export default function EmployeeForm({ id }: { id?: string }) {
  const employee = useAppSelector((s: any) =>
    s.staff?.find((member: any) => member._id === id)
  );

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      name: employee?.name || "",
      email: employee?.email || "",
      password: "",
      role: employee?.role || "zone-manager",
      status: employee?.status || "active",
      image: employee?.image || "",
      access: employee?.access || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "access",
  });

  const handleAddAccess = () => {
    append({ module: "", permissions: [] });
  };

  const handleRemoveAccess = (index: number) => {
    remove(index);
  };

  const onSubmit = (data: EmployeeFormValues) => {
    const formData = {
      ...data,
      image: typeof data.image === "string" ? data.image : data.image?.name,
    };
    console.log(id ? "Update Employee:" : "Create Employee:", formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <TextInput
          control={control}
          name="name"
          label="Full Name"
          placeholder="Enter full name"
        />
        <TextInput
          control={control}
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter email"
        />
        <PasswordInput
          control={control}
          name="password"
          label="Password"
          placeholder="Enter password"
        />
        <SelectInput
          control={control}
          name="role"
          label="Role"
          options={roles}
        />
        <SelectInput
          control={control}
          name="status"
          label="Status"
          options={statusOptions}
        />
        <FileInput control={control} name="image" label="Profile Image" />
      </div>

      <Button
        type="submit"
        className="w-full"
        variant="button"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader /> : id ? "Update Employee" : "Create Employee"}
      </Button>
    </form>
  );
}
