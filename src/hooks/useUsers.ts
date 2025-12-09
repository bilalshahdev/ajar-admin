// /hooks/useUsers.ts
import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  searchUsers,
  updateUser,
  reviewUserDocuments,
  updateUserStatus,
} from "@/services/users";
import { UserStatus } from "@/types";
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

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: UserStatus }) =>
      updateUserStatus(id, status),
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
      toast.success("User status updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useReviewUserDocuments = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: reviewUserDocuments,
    onMutate: async (vars) => {
      const { userId, documentId, status, reason } = vars;

      const userKey = ["user", userId];
      await qc.cancelQueries({ queryKey: userKey });
      const prevUser = qc.getQueryData<any>(userKey);

      // optimistic patch
      if (prevUser?.data?.documents) {
        const nextUser = structuredClone(prevUser);
        const doc = nextUser.data.documents.find(
          (d: any) => d._id === documentId
        );
        if (doc) {
          doc.status = status;
          if (reason !== undefined) doc.reason = reason;
        }
        qc.setQueryData(userKey, nextUser);
      }

      // optionally reflect on list pages if needed
      await qc.cancelQueries({ queryKey: ["users", "paginated"] });
      const prevList = qc.getQueryData<any>(["users", "paginated"]);
      // If list rows include document flags, patch them similarly.

      return { prevUser, prevList };
    },
    onError: (error: any, _vars, ctx) => {
      if (ctx?.prevUser) qc.setQueryData(["user", _vars.userId], ctx.prevUser);
      if (ctx?.prevList) qc.setQueryData(["users", "paginated"], ctx.prevList);
      toast.error(
        error?.response?.data?.message || "Failed to review document"
      );
    },
    onSuccess: (_res, vars) => {
      // revalidate fresh
      qc.invalidateQueries({ queryKey: ["user", vars.userId] });
      qc.invalidateQueries({ queryKey: ["users", "paginated"], exact: false });
      toast.success("Document review saved");
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
