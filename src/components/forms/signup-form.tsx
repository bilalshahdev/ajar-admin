"use client";

import { SignupSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaEnvelope } from "react-icons/fa";
import Loader from "../loader";
import { Button } from "../ui/button";
import PasswordInput from "./fields/password-input";
import TextInput from "./fields/text-input";
import Link from "next/link";
import { Input } from "../ui/input";
import { useState } from "react";
import { Auth, Signup } from "@/types";

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

  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const onSubmit = async (data: Auth) => {
    console.log(data);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsChecked(event.target.checked);
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

        <div className="flex items-center justify-end gap-2">
          <Input
            type="checkbox"
            name="terms"
            className="w-4 h-4"
            checked={isTermsChecked}
            onChange={handleCheckboxChange}
          />
          <Link href="#" className="text-sm text-signature underline">
            Agree with terms and conditions
          </Link>
        </div>
      </div>

      <Button
        variant={"button"}
        type="submit"
        className="w-full font-semibold text-white"
        disabled={isSubmitting || !isTermsChecked}
      >
        {isSubmitting ? <Loader /> : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignupForm;
