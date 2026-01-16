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
import { useEffect, useState } from "react";
import * as secureCrypto from "../../utils/secureCrypto";

const STORAGE_KEY = "myapp_remember_credentials_v1";
const KEY_STORE = "myapp_remember_key_v1";

const LoginForm = () => {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();

  const [remember, setRemember] = useState(false);
  const [loadingRemembered, setLoadingRemembered] = useState(true);

  const { control, handleSubmit, setValue } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      role:
        (typeof window !== "undefined" &&
          (localStorage.getItem("lastRole") as "admin" | "staff")) ||
        "admin",
    },
  });

  /* =========================
     LOAD REMEMBERED CREDENTIALS
     ========================= */
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const rawKey = localStorage.getItem(KEY_STORE);

        if (stored && rawKey) {
          const parsed = JSON.parse(stored) as {
            email: string;
            iv: string;
            cipher: string;
          };

          const key = await secureCrypto.importRawKey(rawKey);
          const password = await secureCrypto.decryptText(
            key,
            parsed.iv,
            parsed.cipher
          );

          if (!mounted) return;

          setValue("email", parsed.email);
          setValue("password", password);
          setRemember(true);
        }
      } catch (err) {
        console.warn("Failed to load remembered credentials", err);
      } finally {
        if (mounted) setLoadingRemembered(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [setValue]);

  /* =========================
     SUBMIT
     ========================= */
  const onSubmit = async (formData: Login) => {
    try {
      /* Remember Me logic */
      if (remember) {
        let rawKey = localStorage.getItem(KEY_STORE);
        const key = rawKey
          ? await secureCrypto.importRawKey(rawKey)
          : await secureCrypto.generateAesKey();

        if (!rawKey) {
          rawKey = await secureCrypto.exportRawKey(key);
          localStorage.setItem(KEY_STORE, rawKey);
        }

        const { iv, cipher } = await secureCrypto.encryptText(
          key,
          formData.password
        );

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            email: formData.email,
            iv,
            cipher,
          })
        );
      } else {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(KEY_STORE);
      }

      login(formData, {
        onSuccess: (responseData: LoginSuccessData | null) => {
          if (!responseData) return;

          const { data } = responseData;

          localStorage.setItem("token", data.token);

          if (
            data?.user?.role === "staff" &&
            data?.user?.allowAccess?.permissions
          ) {
            localStorage.setItem(
              "permissions",
              JSON.stringify(data.user.allowAccess.permissions)
            );
          }

          toast.success("Login successful");
          router.push("/");
        },
        onError: (err) => {
          toast.error(responseError(err));
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      toast.error(responseError(error));
    }
  };

  if (loadingRemembered) {
    return (
      <div className="py-8 text-center">Checking saved credentials...</div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      {/* ROLE SELECTION */}
      <Controller
        control={control}
        name="role"
        render={({ field }) => (
          <RadioGroup
            className="flex items-center gap-4"
            value={field.value}
            onValueChange={(val) => {
              field.onChange(val);
              localStorage.setItem("lastRole", val);
            }}
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

      {/* FIELDS */}
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

        <div className="flex items-center justify-between">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded"
            />
            <span>Remember me</span>
          </label>

          <Link href="#" className="text-sm text-signature">
            Forgot password?
          </Link>
        </div>
      </div>

      <Button
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
