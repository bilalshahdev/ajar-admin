// hooks/useFields.ts

import {
  getFields,
  getField,
  addField,
  updateField,
  deleteField,
  getFieldsList,
} from "@/services/field";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetFields = ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["fields", page, limit],
    queryFn: () => getFields({ page, limit }),
    placeholderData: (previousData) => previousData,
  });
};

export const useGetFieldsList = ({
  enabled = true,
}: {
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["fields-list"],
    queryFn: () => getFieldsList(),
    placeholderData: (previousData) => previousData,
    enabled,
  });
};

export const useGetField = (fieldId: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["field", fieldId],
    queryFn: () => getField(fieldId),
    enabled,
    placeholderData: (previousData) => previousData,
  });
};

export const useAddField = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addField,
    onSuccess: ({ _id }: { _id: string }) => {
      queryClient.invalidateQueries({ queryKey: ["fields"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["field", _id] });
      toast.success("Field added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useUpdateField = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateField(id, data),
    onSuccess: ({ _id }: { _id: string }) => {
      queryClient.invalidateQueries({ queryKey: ["fields"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["field", _id] });
      toast.success("Field updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useDeleteField = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteField(id),
    onSuccess: ({ _id }: { _id: string }) => {
      queryClient.invalidateQueries({ queryKey: ["fields"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["field", _id] });
      toast.success("Field deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
