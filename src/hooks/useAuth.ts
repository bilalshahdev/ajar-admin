import { loginUser, registerUser, getUserDetails } from "@/services/auth";
import {
  AsyncResponse,
  ErrorDetails,
  Login,
  LoginSuccessData,
  Signup,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogin = () => {
  return useMutation<LoginSuccessData | null, ErrorDetails, Login>({
    mutationFn: async (variables) => {
      const res = await loginUser(variables);
      if (res.status === "success") return res.data;
      throw res.error || { message: "Login failed", statusCode: null };
    },
  });
};

// 🔹 Register Hook
export const useRegister = () => {
  return useMutation<AsyncResponse<any | null>, ErrorDetails, Signup>({
    mutationFn: registerUser,
    onSuccess: (response) => {
      if (response.status === "success") {
        toast.success("Registration successful!");
      } else {
        toast.error(response.error?.message || "Registration failed");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "An unexpected error occurred");
    },
  });
};

export const useUser = () => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserDetails(),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  return query;
};
