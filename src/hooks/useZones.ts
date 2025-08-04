// hooks/useZones.ts

import {
  addZone,
  deleteZone,
  getZone,
  getZones,
  updateZone,
} from "@/services/zones";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Fetch zones
export const useGetZones = ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) =>
  useQuery({
    queryKey: ["zones", page, limit],
    queryFn: () => getZones({ page, limit }),
    placeholderData: (previousData) => previousData,
  });

export const useGetZone = (zoneId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["zone", zoneId],
    queryFn: () => getZone(zoneId),
    enabled,
    placeholderData: (previousData) => previousData,
  });
};

// Add zone
export const useAddZone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addZone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zones"], exact: false });
      toast.success("Zone added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

// Update zone
export const useUpdateZone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateZone(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zones"], exact: false });
      toast.success("Zone updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

// Delete zone
export const useDeleteZone = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteZone(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zones"], exact: false });
      toast.success("Zone deleted successfully");
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
      onError?.(error);
    },
  });
};
