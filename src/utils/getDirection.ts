// utils/getDirection.ts or utils/direction.ts

export default function getDirection(locale: string): "rtl" | "ltr" {
  const rtlLocales = ["ar", "ur", "fa", "he"]; // you can expand this list
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}
