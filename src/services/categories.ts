import { api } from "@/lib/axios";
import { Category } from "@/types";

export interface CategoryList {
  name: string;
  _id: string;
}

export interface GetCategoriesResponse {
  success: boolean;
  message: string;
  data: {
    page: number;
    limit: number;
    total: number;
    categories: Category[];
  };
}

export interface GetCategoriesListResponse {
  success: boolean;
  message: string;
  data: CategoryList[];
}

export const getCategories = async ({
  page = 1,
  limit = 10,
  type = "",
}: {
  page: number;
  limit: number;
  type: "categories" | "subCategories" | "";
}): Promise<GetCategoriesResponse> => {
  const response = await api.get(
    `/categories?page=${page}&limit=${limit}&type=${type}`
  );
  return response.data;
};

export const getCategoriesList =
  async (): Promise<GetCategoriesListResponse> => {
    const response = await api.get("/categories/list");
    return response.data;
  };

export const getCategory = async (
  categoryId: string,
  // type: "categories" | "subcategories" | ""
) => {
  const url = `/categories/${categoryId}`;
  // if (type) {
  //   url += `?type=${type}`;
  // }
  const response = await api.get(url);
  return response.data;
};

export const addCategory = async (categoryData: any) => {
  const response = await api.post("/categories", categoryData);
  return response.data;
};

export const updateCategory = async (categoryId: string, categoryData: any) => {
  const response = await api.patch(`/categories/${categoryId}`, categoryData);
  return response.data;
};

export const deleteCategory = async (categoryId: string) => {
  const response = await api.delete(`/categories/${categoryId}`);
  return response.data;
};
