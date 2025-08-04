import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  type: z.enum(["category", "subCategory"]),
  category: z.string().optional(),
  thumbnail: z
    .union([
      z.instanceof(File),
      z.string().min(1, "Thumbnail must be provided"),
    ])
    .optional(),
  icon: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof CategorySchema>;
