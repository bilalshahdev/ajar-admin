import {
  getSecurityDepositRules,
  updateSecurityDepositRules,
  getDamageLiabilityTerms,
  updateDamageLiabilityTerms,
  getRentalDurationLimits,
  updateRentalDurationLimits,
} from "@/services/rentalPolicies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Fetch security deposit rules
export const useGetSecurityDepositRules = (zoneId: string) =>
  useQuery({
    queryKey: ["security-deposit-rules", zoneId],
    queryFn: () => getSecurityDepositRules(zoneId),
    placeholderData: (previousData) => previousData,
    enabled: !!zoneId,
  });

// Update security deposit rules
export const useUpdateSecurityDepositRules = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ zoneId, data }: { zoneId: string; data: any }) =>
      updateSecurityDepositRules(zoneId, data),
    onSuccess: (_, { zoneId }) => {
      queryClient.invalidateQueries({
        queryKey: ["security-deposit-rules", zoneId],
      });
      toast.success("Security deposit rules updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

// Fetch damage liability terms
export const useGetDamageLiabilityTerms = (zoneId: string) =>
  useQuery({
    queryKey: ["damage-liability-terms", zoneId],
    queryFn: () => getDamageLiabilityTerms(zoneId),
    placeholderData: (previousData) => previousData,
    enabled: !!zoneId,
  });

// Update damage liability terms
export const useUpdateDamageLiabilityTerms = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ zoneId, data }: { zoneId: string; data: any }) =>
      updateDamageLiabilityTerms(zoneId, data),
    onSuccess: (_, { zoneId }) => {
      queryClient.invalidateQueries({
        queryKey: ["damage-liability-terms", zoneId],
      });
      toast.success("Damage liability terms updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

// Fetch rental duration limits
export const useGetRentalDurationLimits = (zoneId: string) =>
  useQuery({
    queryKey: ["rental-duration-limits", zoneId],
    queryFn: () => getRentalDurationLimits(zoneId),
    placeholderData: (previousData) => previousData,
    enabled: !!zoneId,
  });

// Update rental duration limits
export const useUpdateRentalDurationLimits = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ zoneId, data }: { zoneId: string; data: any }) =>
      updateRentalDurationLimits(zoneId, data),
    onSuccess: (_, { zoneId }) => {
      queryClient.invalidateQueries({
        queryKey: ["rental-duration-limits", zoneId],
      });
      toast.success("Rental duration limits updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
