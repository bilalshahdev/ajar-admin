// /hooks/useUsers.ts
import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  searchUsers,
  updateUser,
} from "@/services/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetUsers = ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["users", "paginated", page, limit],
    queryFn: () => getUsers({ page, limit }),
    placeholderData: (previousData) => previousData,
  });
};

export const useGetUser = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    placeholderData: (previousData) => previousData,
  });
};

export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: ["users", "search", query],
    queryFn: () => searchUsers(query),
    placeholderData: (previousData) => previousData,
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
      toast.success("User added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateUser(id, data),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["users", "paginated"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["users", "search"],
        exact: false,
      });

      queryClient.invalidateQueries({ queryKey: ["user", id] });
      toast.success("User updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId),

    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({
        queryKey: ["users", "paginated"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["users", "search"],
        exact: false,
      });

      queryClient.invalidateQueries({ queryKey: ["user", userId] });

      toast.success("User deleted successfully");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
