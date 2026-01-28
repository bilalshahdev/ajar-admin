import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "staff"]),
});


export const SignupSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
    user_type: z.enum(["admin"]),
    phone: z.string().optional(),
    dob: z.string().optional(),
    nationality: z.string().optional(),
    image: z.any().optional(), // ✅ for file upload (you'll handle this as FormData in API call)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


  // types 
  export type Login = z.infer<typeof LoginSchema>;
  export type Signup = z.infer<typeof SignupSchema>;