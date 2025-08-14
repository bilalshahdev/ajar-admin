// useFaqs.ts

import { getFaqs, getFaq, addFaq, updateFaq, deleteFaq } from "@/services/faqs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetFaqs = ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) =>
  useQuery({
    queryKey: ["faqs", page, limit],
    queryFn: () => getFaqs({ page, limit }),
    placeholderData: (previousData) => previousData,
  });

export const useGetFaq = (faqId: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["faq", faqId],
    queryFn: () => getFaq(faqId),
    enabled,
    placeholderData: (previousData) => previousData,
  });
};

export const useAddFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addFaq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"], exact: false });
      toast.success("Faq added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useUpdateFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateFaq(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"], exact: false });
      toast.success("Faq updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useDeleteFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFaq(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"], exact: false });
      toast.success("Faq deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
