"use client";

import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/validations/auth";
import { Signup, ErrorDetails } from "@/types";
import { useRegister } from "@/hooks/useAuth";
import { useState } from "react";
import TextInput from "./fields/TextInput";
import PasswordInput from "./fields/PasswordInput";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Loader from "../Loader";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting },
  } = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      dob: "",
      nationality: "",
      user_type: "admin",
    },
  });

  const { mutate: register, isPending } = useRegister();
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  // Connect DOB with ShadCN Calendar
  const {
    field: dobField,
    fieldState: { error: dobError },
  } = useController({
    name: "dob",
    control,
  });

  const onSubmit = async (data: Signup) => {
    register(data, {
      onSuccess: (res) => {
        console.log(res);
        router.push("/");
      },
      onError: (error: ErrorDetails) => {
        if (error?.errors && Array.isArray(error.errors)) {
          error.errors.forEach((err: { path: string[]; message: string }) => {
            if (err.path && err.path.length > 0) {
              const fieldName = err.path[0] as keyof Signup; // Cast to keyof Signup
              setError(fieldName, { // No need to cast fieldName again
                type: "server",
                message: err.message,
              });
            }
          });
        } else if (error?.message) {
          alert(error.message);
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <TextInput
        label="Name"
        name="name"
        placeholder="Enter name"
        control={control}
      />
      <TextInput
        label="Email"
        name="email"
        placeholder="Enter email"
        control={control}
      />
      <PasswordInput
        label="Password"
        name="password"
        placeholder="Enter password"
        control={control}
      />
      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        placeholder="Confirm password"
        control={control}
      />
      <TextInput
        label="Phone"
        name="phone"
        placeholder="Enter phone"
        control={control}
      />

      {/* DOB using ShadCN Date Picker */}
      <div className="space-y-2">
        <label htmlFor="dob-button">Date of Birth</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="dob-button"
              variant="outline"
              className="w-full justify-start text-left"
            >
              {dobField.value
                ? format(new Date(dobField.value), "PPP")
                : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={dobField.value ? new Date(dobField.value) : undefined}
              onSelect={(date) => dobField.onChange(date?.toISOString() || "")}
            />
          </PopoverContent>
        </Popover>
        {dobError && <p className="text-red-500 text-sm">{dobError.message}</p>}
      </div>

      <TextInput
        label="Nationality"
        name="nationality"
        placeholder="Enter nationality"
        control={control}
      />

      {/* File Input */}
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files?.[0]) setValue("image", e.target.files[0]);
        }}
        accept="image/*"
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg"
      />

      {/* Checkbox for terms */}
      <div className="flex items-center justify-end gap-2">
        <Input
          type="checkbox"
          name="terms"
          className="w-4 h-4"
          checked={isTermsChecked}
          onChange={(e) => setIsTermsChecked(e.target.checked)}
        />
        <Link href="#" className="text-sm text-signature underline">
          Agree with terms and conditions
        </Link>
      </div>

      {/* <Button
        variant={"button"}
        type="submit"
        className="w-full font-semibold text-white"
        disabled={isSubmitting}
      > */}
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
