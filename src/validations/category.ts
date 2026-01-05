import { z } from "zod";

const relativeOrAbsoluteUrl = z.string().refine(
  (val) =>
    val.startsWith("/") || // relative URL
    /^https?:\/\//i.test(val), // absolute URL
  {
    message: "Invalid image URL",
  }
);

const fileOrUrl = z.union([
  z.instanceof(File),
  relativeOrAbsoluteUrl,
  z.literal(""),
]);

const BaseCategorySchema = z.object({
  name: z.string().trim().min(2).max(50),
  description: z.string().trim().optional(),
  type: z.enum(["category", "subCategory"]),
  category: z.string().optional(),
  thumbnail: fileOrUrl.optional(),
  icon: fileOrUrl.optional(),
});

export const CreateCategorySchema = BaseCategorySchema.superRefine(
  (data, ctx) => {
    if (!data.thumbnail || data.thumbnail === "") {
      ctx.addIssue({
        path: ["thumbnail"],
        code: z.ZodIssueCode.custom,
        message: "Thumbnail is required",
      });
    }

    if (!data.icon || data.icon === "") {
      ctx.addIssue({
        path: ["icon"],
        code: z.ZodIssueCode.custom,
        message: "Icon is required",
      });
    }

    if (data.type === "subCategory" && !data.category?.trim()) {
      ctx.addIssue({
        path: ["category"],
        code: z.ZodIssueCode.custom,
        message: "Category is required",
      });
    }
  }
);

export const UpdateCategorySchema = BaseCategorySchema.superRefine(
  (data, ctx) => {
    if (data.type === "subCategory" && !data.category?.trim()) {
      ctx.addIssue({
        path: ["category"],
        code: z.ZodIssueCode.custom,
        message: "Category is required",
      });
    }
  }
);

export type CategoryFormValues = z.infer<typeof BaseCategorySchema>;
