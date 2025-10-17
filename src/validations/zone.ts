import { z } from "zod";

export const ZoneSchema = z.object({
  name: z.string().min(1),
  currency: z.string().min(1),
  polygons: z
    .array(
      z
        .array(z.object({ lat: z.number(), lng: z.number() }))
        .min(1, "Each polygon must have at least one point")
    )
    .min(1, "At least one polygon is required"),
});


export type ZoneFormValues = z.infer<typeof ZoneSchema>;
