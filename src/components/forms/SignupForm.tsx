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
import { useTranslations } from "next-intl";

const SignupForm = () => {
  const t = useTranslations("translation");
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

  const {
    field: dobField,
    fieldState: { error: dobError },
  } = useController({
    name: "dob",
    control,
  });

  const onSubmit = async (data: Signup) => {
    register(data, {
      onSuccess: () => {
        router.push("/");
      },
      onError: (error: ErrorDetails) => {
        if (error?.errors && Array.isArray(error.errors)) {
          error.errors.forEach((err: { path: string[]; message: string }) => {
            if (err.path && err.path.length > 0) {
              const fieldName = err.path[0] as keyof Signup;
              setError(fieldName, {
                type: "server",
                message: err.message,
              });
            }
          });
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <TextInput
        label="name"
        name="name"
        placeholder={t("enterValue", { value: t("name") })}
        control={control}
      />
      <TextInput
        label="email"
        name="email"
        placeholder={t("enterValue", { value: t("email") })}
        control={control}
      />
      <PasswordInput
        label="password"
        name="password"
        placeholder={t("enterValue", { value: t("password") })}
        control={control}
      />
      <PasswordInput
        label="confirmPassword"
        name="confirmPassword"
        placeholder={t("enterValue", { value: t("confirmPassword") })}
        control={control}
      />
      <TextInput
        label="phone"
        name="phone"
        placeholder={t("enterValue", { value: t("phone") })}
        control={control}
      />

      <div className="space-y-2">
        <label htmlFor="dob-button">{t("dateOfBirth")}</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="dob-button"
              variant="outline"
              className="w-full justify-start text-left"
            >
              {dobField.value
                ? format(new Date(dobField.value), "PPP")
                : t("pickADate")}
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
        label="nationality"
        name="nationality"
        placeholder={t("enterValue", { value: t("nationality") })}
        control={control}
      />

      {/* File Input */}
      <div className="space-y-1">
        <label className="text-sm">{t("profileImage")}</label>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files?.[0]) setValue("image", e.target.files[0]);
          }}
          accept="image/*"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg"
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Input
          type="checkbox"
          name="terms"
          className="w-4 h-4"
          checked={isTermsChecked}
          onChange={(e) => setIsTermsChecked(e.target.checked)}
        />
        <Link href="#" className="text-sm text-signature underline">
          {t("agreeWithTerms")}
        </Link>
      </div>

      <Button
        variant={"button"}
        type="submit"
        className="w-full font-semibold text-white"
        disabled={isSubmitting || !isTermsChecked}
      >
        {isSubmitting ? <Loader /> : t("signup")}
      </Button>
    </form>
  );
};

export default SignupForm;