import { AsyncResponse } from "@/types";
import { AxiosError } from "axios";

export const asyncHandler = async <T>(
  asyncFn: () => Promise<{ data: T }>
): Promise<AsyncResponse<T>> => {
  try {
    const response = await asyncFn();

    return {
      data: response.data,
      error: null,
      status: "success",
    };
  } catch (err: any) {
    if (err instanceof AxiosError) {
      const response = err.response?.data;
      const message = response?.message || "Something went wrong";
      const errors = response?.errors || null;
      throw {
        message,
        errors,
        statusCode: err.response?.status,
      };
    } else {
      throw {
        message: err?.message || "Something went wrong",
        errors: null,
        statusCode: null,
      };
    }
  }
};
