import { z } from "zod";

export const StaffSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["zone-manager", "category-manager", "form-manager"]),
  image: z.union([z.instanceof(File), z.string()]).optional(),
  status: z.enum(["active", "blocked"]),
  access: z
    .array(
      z.object({
        module: z.string().min(1),
        permissions: z.array(z.string()).min(1),
      })
    )
    .optional(),
});

export type StaffFormValues = z.infer<typeof StaffSchema>;
