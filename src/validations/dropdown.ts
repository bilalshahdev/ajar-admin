import { z } from "zod";

export const ValueSchema = z.object({
  name: z
    .string({ required_error: "Label is required" })
    .trim()
    .min(1, "Label is required")
    .max(64, "Too long"),
  value: z
    .string({ required_error: "Value is required" })
    .trim()
    .min(1, "Value is required")
    .max(64, "Too long")
    .regex(
      /^[a-z0-9]+(?:_[a-z0-9]+)*$/,
      "For key, use snake_case: lowercase letters/numbers with underscores"
    ),
});

export const DropdownSchema = z.object({
  name: z
    .string({ required_error: "Key name is required" })
    .trim()
    .min(2, "At least 2 chars")
    .max(64, "Too long")
    .regex(
      /^[a-z][a-zA-Z0-9]*$/,
      "Use camelCase: must start with lowercase, then letters/numbers"
    ), // e.g. "userDocuments"
  values: z.array(ValueSchema).min(1, "Add at least one value"),
});

export type DropdownValues = z.infer<typeof ValueSchema>;
export type DropdownFormValues = z.infer<typeof DropdownSchema>;
