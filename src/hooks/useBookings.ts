import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBooking, getBooking, getBookings } from "../services/bookings";
import { toast } from "sonner";

export const useBookings = ({
    page = 1,
    limit = 10,
    zone,
}: {
    page: number;
    limit: number;
    zone?: string;
}) => {
    return useQuery({
        queryKey: ["bookings", page, limit, zone],
        queryFn: () => getBookings({ page, limit, zone }),
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
