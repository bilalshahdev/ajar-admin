// hooks/useRentalListings.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getRentalListings,
  getRentalListing,
  deleteRentalListing,
} from "../services/rentalListings";
import { toast } from "sonner";

export const useRentalListings = ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["rental-listings", page, limit],
    queryFn: () => getRentalListings({ page, limit }),
  });
};

export const useRentalListing = (id: string) => {
  return useQuery({
    queryKey: ["rental-listing", id],
    queryFn: () => getRentalListing(id),
  });
};

export const useDeleteRentalListing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRentalListing(id),
    onSuccess: (_, id) => {
      toast.success("Rental listing deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["rental-listings"] });
      queryClient.invalidateQueries({ queryKey: ["rental-listing", id] });
    },
    onError: (error: any) => {
      toast.error("Failed to delete rental listing", error);
    },
  });
};
