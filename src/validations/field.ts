import { z } from "zod";

export const FieldSchema = z.object({
  // name must be camelCase
  name: z
    .string({ required_error: "Field name is required" })
    .min(1, "Field name must be at least 1 character")
    .regex(/^[a-z]+([A-Z][a-z]*)*$/, "Field name must be camelCase"),

  label: z
    .string({ required_error: "Label is required" })
    .min(1, "Label must be at least 1 character"),

  type: z
    .string({ required_error: "Field type is required" })
    .min(1, "Field type must be specified"),

  placeholder: z.string().optional(),

  order: z.coerce.number().int().nonnegative(),

  isMultiple: z.boolean().optional(),

  tooltip: z.string().optional(),

  defaultValue: z.union([z.string(), z.number(), z.boolean()]).optional(),

  visible: z.boolean().default(true).optional(),

  readonly: z.boolean().optional(),

  validation: z
    .object({
      required: z.boolean({
        required_error: "Validation 'required' flag is required",
      }),
      pattern: z.string().optional(),
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),

  dependencies: z.record(z.any()).optional(),

  options: z.array(z.string()).optional(),
});

export type FieldFormValues = z.infer<typeof FieldSchema>;
