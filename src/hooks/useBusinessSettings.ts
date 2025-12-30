// /hooks/useBusinessSettings.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getBusinessSettings,
  saveBusinessSettings,
  deleteBusinessSettings,
} from "@/services/businessSettings";
import { SettingsPageName } from "@/types";

export const useGetBusinessSettings = (pageName: SettingsPageName) => {
  return useQuery({
    queryKey: ["business-settings", pageName],
    queryFn: () => getBusinessSettings(pageName),
    placeholderData: (previousData) => previousData,
  });
};

export const useSaveBusinessSettings = (pageName: SettingsPageName) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => saveBusinessSettings(pageName, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["business-settings", pageName],
      });
      toast.success("Business settings saved successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useDeleteBusinessSettings = (pageName: SettingsPageName) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteBusinessSettings(pageName),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["business-settings", pageName],
      });
      toast.success("Business settings deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
