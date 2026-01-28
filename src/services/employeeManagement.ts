// services/employeeManagement.ts

import { api } from "@/lib/axios";
import { ApiResponse, Employee, EmployeeRole, Pagination } from "@/types";

type EmployeeResponse = ApiResponse<Pagination & { employees: Employee[] }>;

type GetEmployeeResponse = ApiResponse<Employee>;

export const getEmployees = async (): Promise<EmployeeResponse> => {
  const response = await api.get("/employee-management");
  return response.data;
};
//by id
export const getEmployee = async (id: string): Promise<GetEmployeeResponse> => {
  const response = await api.get(`/employee-management/${id}`);
  return response.data;
};
//create
export const createEmployee = async (employeeData: any) => {
  const response = await api.post("/employee-management", employeeData);
  return response.data;
};
//update
export const updateEmployee = async (id: string, employeeData: any) => {
  const response = await api.patch(`/employee-management/${id}`, employeeData);
  return response.data;
};
//delete
export const deleteEmployee = async (id: string) => {
  const response = await api.delete(`/employee-management/${id}`);
  return response.data;
};

type EmployeeRolesResponse = ApiResponse<
  Pagination & { employeeRoles: EmployeeRole[] }
>;

type EmployeeRoleResponse = ApiResponse<EmployeeRole>;

// employee roles/permissions
export const getEmployeeRoles = async (): Promise<EmployeeRolesResponse> => {
  const response = await api.get("/employee-roles");
  return response.data;
};
//by id
export const getEmployeeRole = async (
  id: string
): Promise<EmployeeRoleResponse> => {
  const response = await api.get(`/employee-roles/${id}`);
  return response.data;
};
//create
export const createEmployeeRole = async (roleData: any) => {
  const response = await api.post("/employee-roles", roleData);
  return response.data;
};
//update
export const updateEmployeeRole = async (id: string, roleData: any) => {
  const response = await api.patch(`/employee-roles/${id}`, roleData);
  return response.data;
};
//delete
export const deleteEmployeeRole = async (id: string) => {
  const response = await api.delete(`/employee-roles/${id}`);
  return response.data;
};
