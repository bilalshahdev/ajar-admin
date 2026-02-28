import { api } from "@/lib/axios";
import { ApiResponse, Pagination } from "@/types";
import { RentalListing } from "../types";

export interface GetRentalListingsResponse {
  success: boolean;
  message: string;
  data: {
    page: number;
    limit: number;
    total: number;
    listings: RentalListing[];
  };
}

export interface GetRentalListingResponse {
  success: boolean;
  message: string;
  data: RentalListing;
}

export const getRentalListings = async ({
  page = 1,
  limit = 10,
  zone,
}: {
  page: number;
  limit: number;
  zone?: string;
}): Promise<GetRentalListingsResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(zone && { zone }),
  });
  const response = await api.get(`/marketplace-listings?${params}`);
  return response.data;
};

export const getRentalListing = async (
  id: string
): Promise<GetRentalListingResponse> => {
  const response = await api.get(`/marketplace-listings/${id}`);
  return response.data;
};

export const updateRentalListingStatus = async (
  id: string,
  status: "approved" | "rejected"
): Promise<GetRentalListingResponse> => {
  const response = await api.patch(`/marketplace-listings/${id}/status`, {
    status,
  });
  return response.data;
};

export const deleteRentalListing = async (id: string) => {
  const response = await api.delete(`/marketplace-listings/${id}`);
  return response.data;
};
