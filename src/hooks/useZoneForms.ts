import {
  getAllZoneForms,
  getZoneFormById,
  getZoneFormByZoneAndSubCategory,
  addZoneForm,
  updateZoneForm,
  deleteZoneForm,
} from "@/services/zoneForms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetZoneForms = () =>
  useQuery({
    queryKey: ["zone-forms"],
    queryFn: getAllZoneForms,
    placeholderData: (previousData) => previousData,
  });

export const useGetZoneFormById = (id: string, enabled = true) =>
  useQuery({
    queryKey: ["zone-form", id],
    queryFn: () => getZoneFormById(id),
    enabled,
    placeholderData: (previousData) => previousData,
  });

export const useGetZoneFormByZoneAndSubCategory = (
  zoneId: string,
  subCategoryId: string
) =>
  useQuery({
    queryKey: ["zone-form", zoneId, subCategoryId],
    queryFn: () => getZoneFormByZoneAndSubCategory(zoneId, subCategoryId),
    enabled: !!zoneId && !!subCategoryId,
    placeholderData: (previousData) => previousData,
  });

export const useAddZoneForm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addZoneForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zone-forms"] });
      toast.success("Form added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useUpdateZoneForm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateZoneForm(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["zone-forms"] });
      queryClient.invalidateQueries({ queryKey: ["zone-form", data._id] });
      toast.success("Form updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useDeleteZoneForm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteZoneForm(id),
    onSuccess: ({ data }: { data: { _id: string } }) => {
      queryClient.invalidateQueries({ queryKey: ["zone-forms"] });
      queryClient.invalidateQueries({ queryKey: ["zone-form", data._id] });
      toast.success("Form deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
