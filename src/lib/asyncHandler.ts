import { AsyncResponse } from "@/types";
import { AxiosError } from "axios";

export const asyncHandler = async <T>(
  asyncFn: () => Promise<{ data: T }>
): Promise<AsyncResponse<T | null>> => {
  try {
    const response = await asyncFn();

    return {
      data: response.data,
      error: null,
      status: "success",
    };
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      const response = err.response?.data;
      const message = response?.message || "Something went wrong";
      const errors = response?.errors || null;
      return {
        data: null,
        error: {
          message,
          errors,
          statusCode: err.response?.status,
        },
        status: "error",
      };
    } else if (err instanceof Error) {
      return {
        data: null,
        error: {
          message: err.message,
          errors: null,
          statusCode: null,
        },
        status: "error",
      };
    } else {
      return {
        data: null,
        error: {
          message: "An unknown error occurred",
          errors: null,
          statusCode: null,
        },
        status: "error",
      };
    }
  }
};
