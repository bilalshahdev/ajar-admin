import { z } from "zod";

export const zoneFormSchema = z.object({
  zone: z.string().min(1, "Zone is required"),

  subCategory: z.string().min(1, "Sub category is required"),

  name: z.string().min(1, "Name is required"),

  description: z.string().min(1, "Description is required"),

  fields: z.array(z.string()).min(1, "At least one custom field is required"),

  userDocuments: z
    .array(z.string())
    .min(1, "At least one renter document is required"),

  leaserDocuments: z
    .array(z.string())
    .min(1, "At least one leaser document is required"),

  setting: z.object({
    commissionType: z.enum(["percentage", "fixed"], {
      required_error: "Commission type is required",
    }),

    leaserCommission: z.object({
      value: z.number().min(0, "Value must be 0 or greater"),
      min: z.number().min(0, "Min must be 0 or greater"),
      max: z.number().min(0, "Max must be 0 or greater"),
    }),

    renterCommission: z.object({
      value: z.number().min(0, "Value must be 0 or greater"),
      min: z.number().min(0, "Min must be 0 or greater"),
      max: z.number().min(0, "Max must be 0 or greater"),
    }),

    tax: z.number().min(0, "Tax must be 0 or greater"),

    expiry: z.string().min(1, "Expiry date is required"),
  }),
});

export type ZoneFormValues = z.infer<typeof zoneFormSchema>;