"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLogin } from "@/hooks/useAuth";
import { Login, LoginSuccessData } from "@/types";
import { responseError } from "@/utils/response";
import { LoginSchema } from "@/validations/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "sonner";
import Loader from "../Loader";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import PasswordInput from "./fields/PasswordInput";
import TextInput from "./fields/TextInput";

const LoginForm = () => {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const { control, handleSubmit } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: (localStorage.getItem("lastRole") as "admin" | "staff") || "admin",
    },
  });

  const onSubmit = async (formData: Login) => {
    try {
      login(formData, {
        onSuccess: (responseData: LoginSuccessData | null) => {
          if (responseData) {
            router.push("/");
            const { data } = responseData || {};
            localStorage.setItem("token", data.token);
            if (
              data?.user?.role == "staff" &&
              data?.user?.allowAccess?.permissions
            ) {
              localStorage.setItem(
                "permissions",
                JSON.stringify(data.user.allowAccess?.permissions)
              );
            }
            toast.success("Login successful");
          }
        },
        onError: (err) => {
          toast.error(responseError(err));
        },
      });
    } catch (error) {
      console.error("Error during login submission:", error);
      toast.error(responseError(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      {/* i want to update role value   */}
      <Controller
        control={control}
        name="role"
        defaultValue="admin"
        render={({ field }) => (
          <RadioGroup
            className="flex items-center gap-4"
            onValueChange={(val) => {
              field.onChange(val);
              localStorage.setItem("lastRole", val);
            }}
            value={field.value}
          >
            <RadioGroupItem value="admin" id="admin" />
            <Label htmlFor="admin" className="mr-4">
              Admin
            </Label>

            <RadioGroupItem value="staff" id="staff" />
            <Label htmlFor="staff">Staff</Label>
          </RadioGroup>
        )}
      />

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
        disabled={isPending}
      >
        {isPending ? <Loader /> : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
