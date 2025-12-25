import { api } from "@/lib/axios";
import { Query } from "../types";

export interface GetQueriesResponse {
  success: boolean;
  message: string;
  data: {
    page: number;
    limit: number;
    total: number;
    queries: Query[];
  };
}

export interface GetQueryResponse {
  success: boolean;
  message: string;
  data: Query;
}
// ✅ Fetch paginated querys
export const getQueries = async ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}): Promise<GetQueriesResponse> => {
  const response = await api.get(`/queries?page=${page}&limit=${limit}`);
  return response.data;
};

// ✅ Get single query by ID
export const getQuery = async (queryId: string): Promise<GetQueryResponse> => {
  const response = await api.get(`/queries/${queryId}`);
  return response.data;
};

// ✅ Create a new query
export const addQuery = async (queryData: Partial<Query>) => {
  const response = await api.post("/queries", queryData);
  return response.data;
};

// ✅ Update a query
export const updateQuery = async (
  queryId: string,
  queryData: Partial<Query>
) => {
  const response = await api.patch(`/queries/${queryId}`, queryData);
  return response.data;
};

// ✅ Delete a query
export const deleteQuery = async (queryId: string) => {
  const response = await api.delete(`/queries/${queryId}`);
  return response.data;
};
