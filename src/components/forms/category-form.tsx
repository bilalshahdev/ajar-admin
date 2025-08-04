"use client";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  useAddCategory,
  useGetCategoriesList,
  useGetCategory,
  useUpdateCategory,
} from "@/hooks/useCategories";
import { CategoryFormValues, CategorySchema } from "@/validations/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import FileInput from "./fields/file-input";
import SelectInput from "./fields/select-input";
import TextInput from "./fields/text-input";
import { useRouter } from "next/navigation";

const CategoryForm = ({ id }: { id?: string }) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      type: "category",
      category: "",
      name: "",
      description: "",
      thumbnail: "",
      icon: "",
    },
  });

  const { data: fetchedCategory, isLoading: isCategoryLoading } =
    useGetCategory(id || "", "categories", !!id);

  useEffect(() => {
    if (fetchedCategory?.data) {
      const { type, category, name, description, thumbnail, icon } =
        fetchedCategory.data;
      reset({ type, category, name, description, thumbnail, icon });
    }
  }, [fetchedCategory, reset]);

  const { data: allCategories, isLoading: isCategoriesLoading } =
    useGetCategoriesList();

  const type = useWatch({ control, name: "type" });

  const isEditMode = Boolean(id);

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

    if (formData.icon?.trim()) {
      payload.append("icon", formData.icon);
    }

    if (formData.type === "subCategory" && formData.category?.trim()) {
      payload.append("category", formData.category);
    }

    if (formData.thumbnail instanceof File) {
      payload.append("thumbnail", formData.thumbnail);
    } else if (
      typeof formData.thumbnail === "string" &&
      formData.thumbnail.trim() !== ""
    ) {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectInput
          control={control}
          name="type"
          label="Type"
          options={[
            { label: "Category", value: "category" },
            { label: "SubCategory", value: "subCategory" },
          ]}
        />

        {type === "subCategory" && !isCategoriesLoading && (
          <SelectInput
            control={control}
            name="category"
            label="Category"
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
          label="Name"
          placeholder="e.g. Restaurants"
        />
        <TextInput
          control={control}
          name="description"
          label="Description"
          placeholder="e.g. Description"
        />
        <FileInput control={control} name="thumbnail" label="Thumbnail" />
        <TextInput
          control={control}
          name="icon"
          label="Icon"
          placeholder="e.g. Icon"
        />
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
          "Update Category"
        ) : (
          "Create Category"
        )}
      </Button>
    </form>
  );
};

export default CategoryForm;
