import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeRoles,
  getEmployeeRole,
  createEmployeeRole,
  updateEmployeeRole,
  deleteEmployeeRole,
} from "@/services/employeeManagement";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// ✅ Get All Employees
export const useGetEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });
};

export const useGetEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => getEmployee(id),
    enabled: !!id,
    placeholderData: (previousData) => previousData,
  });
};

export const useAddEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<any> }) =>
      updateEmployee(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employee", data._id] });
      toast.success("Employee updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employee", data._id] });
      toast.success("Employee deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useGetEmployeeRoles = () => {
  return useQuery({
    queryKey: ["employee-roles"],
    queryFn: getEmployeeRoles,
  });
};

export const useGetEmployeeRole = (employeeRoleId: string) => {
  return useQuery({
    queryKey: ["employee-role", employeeRoleId],
    queryFn: () => getEmployeeRole(employeeRoleId),
    enabled: !!employeeRoleId,
    placeholderData: (previousData) => previousData,
  });
};

export const useAddEmployeeRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEmployeeRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-roles"] });
      toast.success("Employee role added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useUpdateEmployeeRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      employeeRoleId,
      data,
    }: {
      employeeRoleId: string;
      data: Partial<any>;
    }) => updateEmployeeRole(employeeRoleId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employee-roles"] });
      queryClient.invalidateQueries({ queryKey: ["employee-role", data._id] });
      toast.success("Employee role updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useDeleteEmployeeRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEmployeeRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employee-roles"] });
      queryClient.invalidateQueries({ queryKey: ["employee-role", data._id] });
      toast.success("Employee role deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
