import { loginUser, registerUser } from "@/services/auth";
import { Signup } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () =>
  useMutation({
    mutationFn: loginUser,
  });

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
