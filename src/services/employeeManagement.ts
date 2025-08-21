// // /services/field.ts

// export interface GetFieldsListResponse {
//   success: boolean;
//   message: string;
//   data: {
//     fields: Field[];
//     total: number;
//     page: number;
//     limit: number;
//   };
// }

// import { api } from "@/lib/axios";
// import { Field } from "@/types";

// export const getFields = async (): Promise<GetFieldsListResponse> => {
//   const response = await api.get("/fields");
//   return response.data;
// };

// export const getFieldsList = async (): Promise<GetFieldsListResponse> => {
//   const response = await api.get("/fields/list");
//   return response.data;
// };

// export const getField = async (fieldId: string): Promise<Field> => {
//   const response = await api.get(`/fields/${fieldId}`);
//   return response.data;
// };

// export const addField = async (fieldData: any) => {
//   const response = await api.post("/fields", fieldData);
//   return response.data;
// };

// export const updateField = async (fieldId: string, fieldData: any) => {
//   const response = await api.patch(`/fields/${fieldId}`, fieldData);
//   return response.data;
// };

// export const deleteField = async (fieldId: string) => {
//   const response = await api.delete(`/fields/${fieldId}`);
//   return response.data;
// };

// services/employeeManagement.ts

import { api } from "@/lib/axios";

export interface GetEmployeesListResponse {
  success: boolean;
  message: string;
  data: {
    employees: any[];
    total: number;
    page: number;
    limit: number;
  };
}

export const getEmployees = async (): Promise<GetEmployeesListResponse> => {
  const response = await api.get("/employee-management");
  return response.data;
};
//by id
export const getEmployee = async (id: string) => {
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






// employee roles/permissions
export const getEmployeeRoles = async () => {
  const response = await api.get("/employee-roles");
  return response.data;
};
//by id
export const getEmployeeRole = async (id: string) => {
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
