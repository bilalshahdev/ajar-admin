import {
  addQuery,
  deleteQuery,
  getQueries,
  getQuery,
  updateQuery,
} from "@/services/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// ✅ Get all queries
export const useGetQueries = ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["queries", page, limit],
    queryFn: () => getQueries({ page, limit }),
    placeholderData: (prev) => prev,
  });
};

// ✅ Get single query
export const useGetQuery = (queryId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["query", queryId],
    queryFn: () => getQuery(queryId),
    enabled,
    placeholderData: (prev) => prev,
  });
};

// ✅ Add new query
export const useAddQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addQuery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queries"] });
      toast.success("Ticket created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create query");
    },
  });
};

// ✅ Update query
export const useUpdateQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateQuery(id, data),
    onSuccess: ({ data }: { data: { _id: string } }) => {
      queryClient.invalidateQueries({ queryKey: ["queries"] });
      queryClient.invalidateQueries({ queryKey: ["query", data._id] });
      toast.success("Query updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update query");
    },
  });
};

// ✅ Delete query
export const useDeleteQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteQuery(id),
    onSuccess: ({ data }: { data: { _id: string } }) => {
      queryClient.invalidateQueries({ queryKey: ["queries"] });
      toast.success("Query deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete query");
    },
  });
};
