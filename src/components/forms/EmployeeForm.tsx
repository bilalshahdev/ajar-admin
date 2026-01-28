"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useWatch } from "react-hook-form"; // Import Controller
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { EmployeeFormValues, EmployeeSchema } from "@/validations/employee";
import FileInput from "./fields/FileInput";
import PasswordInput from "./fields/PasswordInput";
import SelectInput from "./fields/SelectInput";
import TextInput from "./fields/TextInput";
import {
  useAddEmployee,
  useGetEmployee,
  useGetEmployeeRoles,
  useUpdateEmployee,
} from "@/hooks/useEmployees";
import { EmployeeRole } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Blocked", value: "blocked" },
];

export default function EmployeeForm({ id }: { id?: string }) {
  const router = useRouter();

  const { data: rolesData, isLoading: rolesLoading } = useGetEmployeeRoles();
  const { data, isLoading: employeeLoading } = useGetEmployee(id || "");

  const employee = data?.data;
  const employeeRoles: EmployeeRole[] = useMemo(
    () => rolesData?.data?.employeeRoles || [],
    [rolesData]
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
      allowAccess: employee?.allowAccess?._id || "",
      status: "active",
      profileImage: "",
    },
  });

  useEffect(() => {
    if (employee && employeeRoles.length > 0) {
      reset({
        name: employee.name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        password: employee.password || "",
        confirmPassword: employee.password || "",
        address: employee.address || "",
        allowAccess: employee.allowAccess?._id?.toString() || "",
        status: employee.status || "active",
        profileImage: employee.profileImage || "",
      });
    }
  }, [employee, employeeRoles, reset]);

  const isEditMode = Boolean(id);

  const values = useWatch({ control });

  const updateMutation = useUpdateEmployee();
  const addMutation = useAddEmployee();

  const {
    mutate: fieldMutation,
    isPending,
    error,
  } = isEditMode ? updateMutation : addMutation;

  const onSubmit = async (formData: EmployeeFormValues) => {
    const mutationPayload = id ? { id, data: formData } : formData;
    fieldMutation(mutationPayload as any, {
      onSuccess: () => {
        reset();
        router.push("/employee-management");
      },
    });
  };

  if (employeeLoading || rolesLoading) return <Loader />;

  console.log(
    employeeRoles?.map((role) => role._id),
    "employeeRoles Ids",
    `values.allowAccess`,
    employee?.allowAccess?._id
  );

  console.log({ employee });
  console.log({ values });

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
        <TextInput
          control={control}
          name="phone"
          label="Phone Number"
          placeholder="Enter phone number"
        />
        <PasswordInput
          control={control}
          name="password"
          label="Password"
          placeholder="Enter password"
          cPassword="confirmPassword"
        />
        {employee && employeeRoles.length > 0 && (
          <SelectInput
            control={control}
            name="allowAccess"
            label="Allowed Permission"
            options={employeeRoles}
            labelKey="name"
            valueKey="_id"
          />
        )}
        <TextInput
          control={control}
          name="address"
          label="Address"
          placeholder="Enter address"
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
        disabled={isPending}
      >
        {isPending ? <Loader /> : id ? "Update Employee" : "Create Employee"}
      </Button>
      {error && (
        <p className="text-red-500">
          {error?.message || "Something went wrong"}
        </p>
      )}
    </form>
  );
}
