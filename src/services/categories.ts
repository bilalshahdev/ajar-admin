import { api } from "@/lib/axios";
import { ApiResponse, Category, Pagination } from "@/types";

export interface CategoryList {
  name: string;
  _id: string;
}

type GetCategoriesResponse = ApiResponse<
  Pagination & {
    categories: Category[];
  }
>;
type GetCategoriesListResponse = ApiResponse<CategoryList[]>;

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

export const getSubCategoriesList =
  async (): Promise<GetCategoriesListResponse> => {
    const response = await api.get("/categories/list/subcategories");
    return response.data;
  };

export const getCategory = async (
  categoryId: string
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
