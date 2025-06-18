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
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: category?.name || "",
      zoneId: category?.zoneId || zones?.[0]?._id || "",
      thumbnail: category?.thumbnail || "",
    },
  });

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
        <TextInput
          control={control}
          name="name"
          label="Category Name"
          placeholder="e.g. Restaurants"
        />
        <SelectInput
          control={control}
          name="zoneId"
          label="Zone"
          options={zones.map((z: any) => ({
            label: z.name,
            value: z._id,
          }))}
        />
        <FileInput control={control} name="thumbnail" label="Thumbnail Image" />
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
