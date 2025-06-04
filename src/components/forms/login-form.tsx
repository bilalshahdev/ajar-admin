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
import { Login, LoginSuccessData } from "@/types"; // Added LoginSuccessData
import { useLogin } from "@/hooks/useAuth";

const LoginForm = () => {
  const router = useRouter();
  const { mutate: login } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "user",
    },
  });

  const onSubmit = async (formData: Login) => { // Renamed data to formData for clarity
    try {
      login(formData, {
        onSuccess: (responseData: LoginSuccessData | null) => { // Updated parameter
          if (responseData) { // Null check
            router.push("/");
            localStorage.setItem("token", responseData.token);
            localStorage.setItem("userid", responseData.user._id);
          } else {
            // Optional: handle case where data is null even on success
            console.error("Login successful but no data received.");
            // Potentially show a generic error to the user via toast or state update
          }
        },
        onError: (err) => { // err here is ErrorDetails from useLogin hook
          console.log("Login failed:", err.message);
          // Optionally, display err.message or specific errors from err.errors to the user
        },
      });
    } catch (error) { // This catch is for unexpected errors in the onSubmit function itself
      console.error("Error during login submission:", error);
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
