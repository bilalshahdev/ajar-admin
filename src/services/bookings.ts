import { api } from "@/lib/axios";
import { Booking } from "@/types";

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

export const getBookings = async ({
    page = 1,
    limit = 10,
    zone,
}: {
    page: number;
    limit: number;
    zone?: string;
}) => {
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(zone && { zone }),
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
