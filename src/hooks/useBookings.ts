import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBooking, getBooking, getBookings, getSeasonalBookingsGraph } from "../services/bookings";
import { toast } from "sonner";

export const useBookings = ({
    page = 1,
    limit = 10,
    zone,
    subCategory,
    checkIn,
    checkOut
}: {
    page: number;
    limit: number;
    zone?: string;
    subCategory?: string;
    checkIn?: string;
    checkOut?: string;
}) => {
    return useQuery({
        queryKey: ["bookings", page, limit, zone, subCategory, checkIn, checkOut],
        queryFn: () => getBookings({ page, limit, zone, subCategory, checkIn, checkOut }),
        staleTime: 5 * 60 * 1000, 
        gcTime: 10 * 60 * 1000,
    });
};

export const useBooking = (id: string) => {
    return useQuery({
        queryKey: ["booking", id],
        queryFn: () => getBooking(id),
    });
};

export const useDeleteBooking = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteBooking(id),
        onSuccess: (_, id) => {
            toast.success("Booking deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            queryClient.invalidateQueries({ queryKey: ["booking", id] });
        },
        onError: (error: any) => {
            toast.error("Failed to delete booking", error);
        },
    });
};

export const useSeasonalBookingsGraph = (year: number, subCategory?: string) => {
    return useQuery({
        queryKey: ["bookings", "seasonal-graph", year, subCategory],
        queryFn: () => getSeasonalBookingsGraph(year, subCategory),
        select: (data) => data.data,
    });
};