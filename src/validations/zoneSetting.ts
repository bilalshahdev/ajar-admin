// schemas/zoneSetting.ts
import { z } from "zod";

export const LanguageSchema = z.object({
  locale: z.string().min(1, "Locale is required"),
  translations: z.object({
    name: z.string().min(1, "Translation name is required"),
    description: z.string().min(1, "Translation description is required"),
  }),
  _id: z.string().min(1, "Language ID is required"),
});

const CommissionSchema = z
  .object({
    value: z.coerce.number().min(0, "Commission value must be non-negative"),
    min: z.coerce.number().min(0, "Minimum commission must be non-negative"),
    max: z.coerce.number().min(0, "Maximum commission must be non-negative"),
  })
  .refine((d) => d.min <= d.value && d.value <= d.max, {
    message: "Commission value must be between min and max",
    path: ["value"],
  });

export const ZoneSchema = z.object({
  _id: z.string().min(1, "Zone ID is required").optional(), // optional for create
  zone: z.string().min(1, "Zone is required"),
  subCategory: z.string().min(1, "Subcategory is required"),
  fields: z.array(z.string().min(1)).min(1, "At least one field is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  setting: z.object({
    commissionType: z.enum(["fixed", "percentage"], {
      errorMap: () => ({
        message: "Commission type must be either 'fixed' or 'percentage'",
      }),
    }),
    leaserCommission: CommissionSchema,
    renterCommission: CommissionSchema,
    tax: z.coerce.number().min(0, "Tax must be non-negative"),
    // keep string as per your interface; validate ISO-ish (YYYY-MM-DD) if you want
    expiry: z.string().min(1, "Expiry is required"),
  }),
  userDocuments: z.array(z.string().min(1)).optional().default([]),
  languages: z.array(LanguageSchema).optional(),
});

export type ZoneFormValues = z.infer<typeof ZoneSchema>;
