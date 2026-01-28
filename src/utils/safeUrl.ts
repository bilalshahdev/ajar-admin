// /lib/url.ts
export const safeUrl = (u: string) => {
  try {
    if (u.startsWith("/")) return u; // same-origin
    const url = new URL(
      u,
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost"
    );
    return url.toString();
  } catch {
    return "#";
  }
};
