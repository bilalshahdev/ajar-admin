import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  role: "admin" | "user";
  exp: number;
  iat: number;
}

export const getDecodedToken = (): DecodedToken | null => {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      return null; // Token expired
    }
    return decoded;
  } catch {
    return null;
  }
};
