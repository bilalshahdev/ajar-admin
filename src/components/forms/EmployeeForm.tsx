"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EmployeeRole } from "@/types";
import { Label } from "../ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const router = useRouter();

  const { data: rolesData, isLoading: rolesLoading } = useGetEmployeeRoles();
  const { data, isLoading: employeeLoading } = useGetEmployee(id || "");

  const employee = data?.data;
  const employeeRoles: EmployeeRole[] = rolesData?.data?.employeeRoles || [];

  const [employeeRoleData, setEmployeeRoleData] = useState<EmployeeRole>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      name: employee?.name || "",
      email: employee?.email || "",
      phone: employee?.phone || "",
      password: employee?.password || "",
      confirmPassword: employee?.password || "",
      address: employee?.address || "",
      allowAccess: employee?.allowAccess?._id || "",
      status: employee?.status || "active",
      profileImage: employee?.profileImage || "",
    },
  });
  useEffect(() => {
    if (employee) {
      reset({
        ...employee,
        name: employee?.name || "",
        email: employee?.email || "",
        phone: employee?.phone || "",
        password: employee?.password || "",
        confirmPassword: employee?.password || "",
        address: employee?.address || "",
        allowAccess: employee?.allowAccess?._id || "",
        status: employee?.status || "active",
        profileImage: employee?.profileImage || "",
      });
      setEmployeeRoleData(employee?.allowAccess || []);
    }
  }, [employee, reset]);

  const isEditMode = Boolean(id);

  const updateMutation = useUpdateEmployee();
  const addMutation = useAddEmployee();

  const {
    mutate: fieldMutation,
    isPending,
    error,
  } = isEditMode ? updateMutation : addMutation;
  const onSubmit = async (formData: EmployeeFormValues) => {
    const mutationPayload = id ? { id, data: formData } : formData;
    console.log(mutationPayload);
    fieldMutation(mutationPayload as any, {
      onSuccess: () => {
        reset();
        router.push("/employee-management");
      },
    });
  };

  if (employeeLoading && id) return <Loader />;
  console.log(employeeRoleData);
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
        <>
          <div className="space-y-2">
            <Label>Allowed Permission</Label>
            <Select
              value={employeeRoleData?._id}
              onValueChange={(value) => {
                const selectedRole = employeeRoles.find(
                  (role) => role._id === value
                );
                setEmployeeRoleData(selectedRole);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={employeeRoleData?.name || "Select a role"}
                />
              </SelectTrigger>
              <SelectContent>
                {employeeRoles.map((role) => (
                  <SelectItem key={role._id} value={role._id!}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
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
