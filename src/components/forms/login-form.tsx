"use client";

import { LoginSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaEnvelope } from "react-icons/fa";
import { Button } from "../ui/button";
import PasswordInput from "./fields/password-input";
import TextInput from "./fields/text-input";
import Loader from "../loader";
import { Login } from "@/types";
import { useLogin } from "@/hooks/useAuth";

const LoginForm = () => {
  const router = useRouter();
  const { mutate: login, isPending, error } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "user",
    },
  });

  const onSubmit = async (data: Login) => {
    try {
      login(data, {
        onSuccess: ({ data }) => {
          router.push("/");
          localStorage.setItem("token", data.token);
          localStorage.setItem("userid", data.user._id);
        },
        onError: (err) => {
          console.log("Login failed:", err);
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <div className="grid gap-2">
        <TextInput
          label="email id"
          name="email"
          placeholder="Enter email"
          control={control}
          icon={<FaEnvelope />}
        />
        <PasswordInput
          label="password"
          name="password"
          placeholder="Enter password"
          control={control}
        />
        <Link href="#" className="text-sm text-signature ml-auto">
          Forgot password?
        </Link>
      </div>

      <Button
        variant={"button"}
        type="submit"
        className="w-full font-semibold text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader /> : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
