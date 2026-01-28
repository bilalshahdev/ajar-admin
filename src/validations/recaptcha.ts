import { z } from "zod";

export const RecaptchaSchema = z
  .object({
    enabled: z.boolean(),
    siteKey: z.string().optional(),
    secretKey: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.enabled) {
      if (!data.siteKey?.trim()) {
        ctx.addIssue({
          path: ["siteKey"],
          code: "custom",
          message: "Site Key is required when reCAPTCHA is enabled",
        });
      }

      if (!data.secretKey?.trim()) {
        ctx.addIssue({
          path: ["secretKey"],
          code: "custom",
          message: "Secret Key is required when reCAPTCHA is enabled",
        });
      }
    }
  });
