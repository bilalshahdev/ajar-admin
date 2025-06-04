import { asyncHandler } from "@/lib/asyncHandler";
import { api } from "@/lib/axios";
import { Login, Signup, AsyncResponse, LoginSuccessData } from "@/types";

export const registerUser = (data: Signup) =>
  asyncHandler(async () => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("user_type", data.user_type);
    if (data.phone) formData.append("phone", data.phone);
    if (data.dob) formData.append("dob", data.dob);
    if (data.nationality) formData.append("nationality", data.nationality);
    if (data.image) formData.append("image", data.image);

    // Assuming registerUser might also benefit from the new asyncHandler structure
    // and might return a specific data type upon success.
    // For now, let's assume its return type is not yet LoginSuccessData,
    // so we'll type it as `any` for the successful data part.
    // If it has a defined success response, that should be used instead of `any`.
    return api.post<{ data: any }>("/users/signup", formData);
  });

export const loginUser = (
  data: Login
): Promise<AsyncResponse<LoginSuccessData | null>> =>
  asyncHandler<LoginSuccessData>(() => api.post("/users/login", data));
