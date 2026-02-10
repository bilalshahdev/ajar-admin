import { getWallet } from "@/services/wallet";
import { useQuery } from "@tanstack/react-query";

export const useGetWallet = () => {
    return useQuery({
        queryKey: ["wallet"],
        queryFn: getWallet,
    });
};