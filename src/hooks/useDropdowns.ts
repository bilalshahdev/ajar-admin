// hooks/useDropdowns.ts
import {
  addValueToDropdown,
  createDropdown,
  deleteDropdown,
  getDropdown,
  getDropdownByName,
  getDropdowns,
  removeValueFromDropdown,
  updateDropdown,
} from "@/services/dropdowns";
import { ListDropdownsQuery } from "@/types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetDropdowns = (
  query: ListDropdownsQuery = { page: 1, limit: 10 }
) =>
  useQuery({
    queryKey: ["dropdowns", query.page, query.limit, query.name],
    queryFn: () => getDropdowns(query),
    placeholderData: (prev) => prev,
  });

export const useGetDropdown = (id: string, enabled?: boolean) =>
  useQuery({
    queryKey: ["dropdown", id],
    queryFn: () => getDropdown(id),
    enabled,
    placeholderData: (prev) => prev,
  });

export const useGetDropdownByName = (name: string, enabled = true) =>
  useQuery({
    queryKey: ["dropdown-by-name", name],
    queryFn: () => getDropdownByName(name),
    enabled,
    placeholderData: (prev) => prev,
  });

export const useAddDropdown = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createDropdown,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dropdowns"], exact: false });
      toast.success("Dropdown created successfully");
    },
    onError: (e: any) =>
      toast.error(e?.response?.data?.message || "Failed to create dropdown"),
  });
};

export const useUpdateDropdown = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateDropdown(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dropdowns"], exact: false });
      qc.invalidateQueries({ queryKey: ["dropdown"], exact: false });
      qc.invalidateQueries({ queryKey: ["dropdown-by-name"], exact: false });
      toast.success("Dropdown updated successfully");
    },
    onError: (e: any) =>
      toast.error(e?.response?.data?.message || "Failed to update dropdown"),
  });
};

export const useAddDropdownValue = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      name,
      value,
    }: {
      name: string;
      value: { name: string; value: string };
    }) => addValueToDropdown(name, value),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dropdowns"], exact: false });
      qc.invalidateQueries({ queryKey: ["dropdown-by-name"], exact: false });
      toast.success("Value added to dropdown");
    },
    onError: (e: any) =>
      toast.error(e?.response?.data?.message || "Failed to add value"),
  });
};

// Remove Value
export const useRemoveDropdownValue = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ name, value }: { name: string; value: string }) =>
      removeValueFromDropdown(name, value),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dropdowns"], exact: false });
      qc.invalidateQueries({ queryKey: ["dropdown-by-name"], exact: false });
      toast.success("Value removed from dropdown");
    },
    onError: (e: any) =>
      toast.error(e?.response?.data?.message || "Failed to remove value"),
  });
};

export const useDeleteDropdown = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDropdown(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dropdowns"], exact: false });
      toast.success("Dropdown deleted successfully");
    },
    onError: (e: any) =>
      toast.error(e?.response?.data?.message || "Failed to delete dropdown"),
  });
};
