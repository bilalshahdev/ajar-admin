import { z } from "zod";

export const ZoneSchema = z.object({
  name: z.string().min(1),
  currency: z.string().min(1),
  latLng: z
    .array(z.array(z.object({ lat: z.number(), lng: z.number() })))
    .optional(),
});

export type ZoneFormValues = z.infer<typeof ZoneSchema>;
