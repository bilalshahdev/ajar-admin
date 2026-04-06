import { api } from "@/lib/axios";
import { Booking, SeasonalGraphMonth } from "@/types";

export interface GetBookingsResponse {
    success: boolean;
    message: string;
    data: {
        page: number;
        limit: number;
        total: number;
        bookings: Booking[];
    };
}

export interface GetBookingResponse {
    success: boolean;
    message: string;
    data: Booking;
}

export interface GetSeasonalGraphResponse {
  success: boolean;
  message: string;
  data: {
    year: number;
    months: SeasonalGraphMonth[];
  };
}


export const getBookings = async ({
    page = 1,
    limit = 10,
    zone,
    subCategory,
    checkIn,
    checkOut,
}: {
    page: number;
    limit: number;
    zone?: string;
    subCategory?: string;
    checkIn?: string;
    checkOut?: string;
}) => {
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(zone && { zone }),
        ...(subCategory && { subCategory }),
        ...(checkIn && { checkIn }),
        ...(checkOut && { checkOut }),
    });
    const response = await api.get(`/bookings?${params}`);
    return response.data.data;
};


export const getBooking = async (
    id: string
): Promise<GetBookingResponse> => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
};

export const deleteBooking = async (id: string) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
};

export const getSeasonalBookingsGraph = async (year?: number, subCategory?: string): Promise<GetSeasonalGraphResponse> => {
  const params = new URLSearchParams({
    ...(year && { year: String(year) }),
    ...(subCategory && { subCategory }),
  });
  const response = await api.get(`/bookings/graph/seasonal?${params}`);
  return response.data.data;
};
