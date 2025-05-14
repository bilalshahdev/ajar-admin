import { asyncHandler } from "@/lib/asyncHandler";
import { api } from "@/lib/axios";
import { Login, Signup } from "@/types";

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

    return api.post("/users/signup", formData).then((res) => res.data);
  });

export const loginUser = (data: Login) =>
  asyncHandler(() => api.post("/users/login", data).then((res) => res.data));
