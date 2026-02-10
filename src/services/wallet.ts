import { api } from "@/lib/axios";

export const getWallet = async () => {
    const { data } = await api.get("/users/wallet");
    return data;
};