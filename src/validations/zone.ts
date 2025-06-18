import { z } from "zod";

export const ZoneSchema = z.object({
  name: z.string().min(2),
  country: z.string().min(2),
  currency: z.string().min(2),
  timeZone: z.string().min(2),
  language: z.string().min(2),
  radius: z.coerce.number().min(1),
  lat: z.coerce.number(),
  long: z.coerce.number(),
  thumbnail: z.string().optional(),
  adminNotes: z.string().optional(),
});

export type ZoneFormValues = z.infer<typeof ZoneSchema>;
