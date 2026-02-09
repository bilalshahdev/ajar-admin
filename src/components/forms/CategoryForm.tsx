"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  useAddCategory,
  useGetCategoriesList,
  useGetCategory,
  useUpdateCategory,
} from "@/hooks/useCategories";
import { CategoryFormValues, CreateCategorySchema, UpdateCategorySchema } from "@/validations/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import FileInput from "./fields/FileInput";
import SelectInput from "./fields/SelectInput";
import TextInput from "./fields/TextInput";
import { useTranslations } from "next-intl";

const CategoryForm = ({ id }: { id?: string }) => {
  const t = useTranslations();
  const router = useRouter();
  const { data: fetchedCategory, isLoading: isCategoryLoading } =
    useGetCategory(id || "", !!id);

  const schema = id ? UpdateCategorySchema : CreateCategorySchema;
  const { control, handleSubmit, reset } = useForm<CategoryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: fetchedCategory?.data?.type || "category",
      category: fetchedCategory?.data?.category?._id || "",
      name: fetchedCategory?.data?.name || "",
      description: fetchedCategory?.data?.description || "",
      thumbnail: fetchedCategory?.data?.thumbnail || "",
      icon: fetchedCategory?.data?.icon || "",
    },
  });

  useEffect(() => {
    if (fetchedCategory?.data) {
      const { type, category, name, description, thumbnail, icon } =
        fetchedCategory.data;

      reset({
        category: category?._id ?? "",
        type,
        name,
        description,
        thumbnail,
        icon,
      });
    }
  }, [fetchedCategory, reset]);

  const { data: allCategories, isLoading: isCategoriesLoading } =
    useGetCategoriesList();

  const type = useWatch({ control, name: "type" });

  const isEditMode = Boolean(id);
  const categoryNotFound =
    isEditMode &&
    !isCategoryLoading &&
    !fetchedCategory?.data;
  const updateMutation = useUpdateCategory();
  const addMutation = useAddCategory();

  const { mutate: categoryMutation, isPending: categoryLoading } = isEditMode
    ? updateMutation
    : addMutation;
  const onSubmit = async (formData: CategoryFormValues) => {
    const payload = new FormData();

    payload.append("type", formData.type);
    payload.append("name", formData.name);

    if (formData.description?.trim()) {
      payload.append("description", formData.description);
    }

    if (formData.icon instanceof File) {
      payload.append("icon", formData.icon);
    } else if (typeof formData.icon === "string") {
      payload.append("icon", formData.icon);
    }

    if (formData.type === "subCategory" && formData.category?.trim()) {
      payload.append("category", formData.category);
    }

    if (formData.thumbnail instanceof File) {
      payload.append("thumbnail", formData.thumbnail);
    } else if (typeof formData.thumbnail === "string") {
      payload.append("thumbnail", formData.thumbnail);
    }

    const mutationPayload = id ? { id, data: payload } : payload;

    categoryMutation(mutationPayload as any, {
      onSuccess: () => {
        reset();
        router.push("/category-management");
      },
    });
  };

  if (isCategoryLoading && id) return <Loader />;

  if (categoryNotFound) {
    return (
      <div className="h-64 flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">
          Category not found
        </p>
        {/* <Button variant="outline" onClick={() => router.push("/category-management")}>
          Go back
        </Button> */}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!isEditMode && (
          <SelectInput
            control={control}
            name="type"
            label="type"
            options={[
              { label: "category", value: "category" },
              { label: "subCategory", value: "subCategory" },
            ]}
            disabled={isEditMode}
          />
        )}

        {type === "subCategory" && !isCategoriesLoading && (
          <SelectInput
            control={control}
            name="category"
            label="category"
            options={
              allCategories?.data?.map((cat: any) => ({
                label: cat.name,
                value: cat._id,
              })) || []
            }
          />
        )}

        <TextInput
          control={control}
          name="name"
          label="name"
          placeholder={t("translation.egRestaurants")}
        />
        <TextInput
          control={control}
          type="textarea"
          name="description"
          label="description"
          placeholder={t("translation.egDescription")}
          className="md:col-span-2"
        />
        <FileInput control={control} name="thumbnail" label="thumbnail" />
        <FileInput control={control} name="icon" label="icon" />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={categoryLoading}
        variant="button"
      >
        {categoryLoading ? (
          <Loader className="border-foreground" />
        ) : id ? (
          t("translation.updateCategory")
        ) : (
          t("translation.createCategory")
        )}
      </Button>
    </form>
  );
};

export default CategoryForm;
