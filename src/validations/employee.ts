import { z } from "zod";



export const EmployeeSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    address: z.string().optional(),
    allowAccess: z.string().min(1, "Allowed Permission is required"),
    status: z.enum(["active", "blocked"]),
    profileImage: z.union([z.instanceof(File), z.string()]).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type EmployeeFormValues = z.infer<typeof EmployeeSchema>;
