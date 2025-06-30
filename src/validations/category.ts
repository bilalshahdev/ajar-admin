import { z } from "zod";
// name: string;
//   slug: string;
//   description?: string;
//   icon?: string;
//   image?: string;
//   thumbnail?: string;     // optional, still supported if you prefer
//   type: "category" | "subCategory";
//   categoryId?: mongoose.Types.ObjectId;
//    language?: string;
//     languages?: ILanguageTranslation[];
//   createdAt: Date;
//   updatedAt: Date;
export const CategorySchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
  thumbnail: z.union([z.string().url(), z.instanceof(File)]).optional(),
  type: z.enum(["category", "subCategory"]),
  categoryId: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof CategorySchema>;
