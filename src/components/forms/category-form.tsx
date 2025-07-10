"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/store/hooks";
import TextInput from "./fields/text-input";
import Loader from "@/components/loader";
import { CategoryFormValues, CategorySchema } from "@/validations/category";
import SelectInput from "./fields/select-input";
import FileInput from "./fields/file-input";

const CategoryForm = ({ id }: { id?: string }) => {
  const zones = useAppSelector((state: any) => state.zones) || [];
  const categories = useAppSelector((state: any) => state.categories) || [];
  const category = categories.find((cat: any) => cat._id === id);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    watch,
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      type: category?.type || "category",
      categoryId: category?.categoryId || "",
      name: category?.name || "",
      description: category?.description || "",
      thumbnail: category?.thumbnail || "",
      icon: category?.icon || "",
    },
  });

  const type = watch("type");

  const onSubmit = async (data: CategoryFormValues) => {
    if (id) {
      console.log("Update Category: ", data);
    } else {
      console.log("Create Category: ", data);
    }
    reset();
  };

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
        {type === "subCategory" && (
          <SelectInput
            control={control}
            name="categoryId"
            label="Category"
            options={categories.map((cat: any) => ({
              label: cat.name,
              value: cat._id,
            }))}
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
        disabled={isSubmitting}
        variant={"button"}
      >
        {isSubmitting ? <Loader /> : id ? "Update Category" : "Create Category"}
      </Button>
    </form>
  );
};

export default CategoryForm;
