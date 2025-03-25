"use client";

import { SignupSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaEnvelope } from "react-icons/fa";
import Loader from "../loader";
import { Button } from "../ui/button";
import PasswordInput from "./fields/password-input";
import TextInput from "./fields/text-input";

const SignupForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: Auth) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <div className="grid gap-2">
        <TextInput
          label="email id"
          name="username"
          placeholder="Enter username"
          control={control}
          icon={<FaEnvelope />}
        />
        <PasswordInput
          label="password"
          name="password"
          cPassword="confirmPassword"
          placeholder="Enter password"
          control={control}
        />
      </div>

      <Button
        variant={"signature"}
        type="submit"
        className="w-full font-semibold text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader /> : "Login"}
      </Button>
    </form>
  );
};

export default SignupForm;
