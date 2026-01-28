export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const limit = process.env.NEXT_PUBLIC_API_LIMIT
  ? Number(process.env.NEXT_PUBLIC_API_LIMIT)
  : 15;
