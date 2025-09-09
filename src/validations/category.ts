import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  type: z.enum(["category", "subCategory"]),
  category: z.string().optional(),
  thumbnail: z.union([z.instanceof(File), z.string().url()]).optional(),
  icon: z.union([z.instanceof(File), z.string().url()]).optional(),
});

export type CategoryFormValues = z.infer<typeof CategorySchema>;
