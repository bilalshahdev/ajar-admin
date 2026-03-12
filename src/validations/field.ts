import { z } from "zod";

export const FieldSchema = z.object({
  name: z
    .string({ required_error: "Field name is required" })
    .min(1, "Field name must be at least 1 character"),

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
      error: z.string().optional(),
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),

  dependencies: z.record(z.any()).optional(),

  // Keep this as is for the base structure
  options: z.array(z.string()).optional(),
}).superRefine((data, ctx) => {
  // Logic: If type is a choice type, options MUST have at least 1 item
  const typesWithOptions = ["select", "radio", "multiselect"];

  if (typesWithOptions.includes(data.type)) {
    if (!data.options || data.options.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one option is required for this input type",
        path: ["options"], // This points the error specifically to the options field
      });
    }
  }
});

export type FieldFormValues = z.infer<typeof FieldSchema>;