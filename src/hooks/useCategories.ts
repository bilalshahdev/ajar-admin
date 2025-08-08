// hooks/useCategories.ts

import {
  addCategory,
  deleteCategory,
  getCategory,
  getCategories,
  updateCategory,
  getCategoriesList,
  getSubCategoriesList,
} from "@/services/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetCategories = ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) =>
  useQuery({
    queryKey: ["categories", page, limit],
    queryFn: () => getCategories({ page, limit, type: "" }),
    placeholderData: (previousData) => previousData,
  });

export const useGetCategory = (
  categoryId: string,
  // type: "categories" | "subcategories",
  enabled?: boolean
) => {
  return useQuery({
    queryKey: ["category", categoryId],
    // queryFn: () => getCategory(categoryId, type),
    queryFn: () => getCategory(categoryId),
    enabled,
    placeholderData: (previousData) => previousData,
  });
};

export const useGetCategoriesList = () =>
  useQuery({
    queryKey: ["categories-list"],
    queryFn: () => getCategoriesList(),
    placeholderData: (previousData) => previousData,
  });

export const useGetSubCategoriesList = () =>
  useQuery({
    queryKey: ["subcategories-list"],
    queryFn: () => getSubCategoriesList(),
    placeholderData: (previousData) => previousData,
  });

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["categories-list"] });
      queryClient.invalidateQueries({ queryKey: ["subcategories-list"] });
      toast.success("Category added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateCategory(id, data),
    onSuccess: ({ data }: { data: { _id: string } }) => {
      queryClient.invalidateQueries({ queryKey: ["categories"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["categories-list"] });
      queryClient.invalidateQueries({ queryKey: ["subcategories-list"] });
      queryClient.invalidateQueries({ queryKey: ["category", data._id] });
      toast.success("Category updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: ({ data }: { data: { _id: string } }) => {
      queryClient.invalidateQueries({ queryKey: ["categories"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["categories-list"] });
      queryClient.invalidateQueries({ queryKey: ["subcategories-list"] });
      queryClient.invalidateQueries({ queryKey: ["category", data._id] });
      toast.success("Category deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
