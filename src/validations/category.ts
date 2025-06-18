import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(2, "Name is required"),
  zoneId: z.string().min(1, "Zone is required"),
  thumbnail: z.union([z.string().url(), z.instanceof(File)]).optional(),
});

export type CategoryFormValues = z.infer<typeof CategorySchema>;
