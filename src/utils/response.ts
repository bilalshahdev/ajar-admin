export const responseError = (error: any) => {
  const errorMessage =
    error?.response?.data?.message || error?.message || "Something went wrong";
  return errorMessage;
};
