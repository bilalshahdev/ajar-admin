// utils/getImageUrl.ts
import { baseUrl } from "@/config/constants";

export function getImageUrl(src?: string | File | null): string | undefined {
  if (!src) return undefined;

  if (typeof src === "string") {
    const isFileObjectUrl = src.startsWith("blob:");
    const isAbsoluteUrl = src.startsWith("http");
    const fileUrl = src.startsWith("/uploads");
    const isPublicPath = src.startsWith("/");

    if (fileUrl) {
      return `${baseUrl}/${src}`;
    } else if (isPublicPath) {
      return src;
    } else if (!isFileObjectUrl && !isAbsoluteUrl) {
      return `${baseUrl}/${src}`;
    } else {
      return src;
    }
  }

  if (src instanceof File) {
    return URL.createObjectURL(src);
  }

  return undefined;
}
