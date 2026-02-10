import { api } from "@/lib/axios";

export async function getNotification() {
  const { data } = await api.get(`/notifications`);
  return data.data;
}