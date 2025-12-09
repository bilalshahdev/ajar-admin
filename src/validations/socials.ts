// validations/social.ts
import { z } from "zod";

const providerSchema = z.object({
  enabled: z.boolean(),
  callbackUrl: z.string().optional(),
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
});

const facebookSchema = z.object({
  enabled: z.boolean(),
  callbackUrl: z.string().optional(),
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
});

const appleSchema = z.object({
  enabled: z.boolean(),
  clientId: z.string().optional(),
  teamId: z.string().optional(),
  keyId: z.string().optional(),
  serviceFile: z.any().optional(),
});

// ✅ Refine required fields only when enabled
export const SocialLoginSchema = z.object({
  google: providerSchema.superRefine((data, ctx) => {
    if (data.enabled) {
      if (!data.callbackUrl || !data.callbackUrl.trim()) {
        ctx.addIssue({
          path: ["callbackUrl"],
          message: "Callback URL is required",
          code: "custom",
        });
      } else {
        try {
          new URL(data.callbackUrl); // manual URL validation
        } catch {
          ctx.addIssue({
            path: ["callbackUrl"],
            message: "Invalid URL",
            code: "custom",
          });
        }
      }

      if (!data.clientId?.trim()) {
        ctx.addIssue({
          path: ["clientId"],
          message: "Client ID is required",
          code: "custom",
        });
      }

      if (!data.clientSecret?.trim()) {
        ctx.addIssue({
          path: ["clientSecret"],
          message: "Client Secret is required",
          code: "custom",
        });
      }
    }
  }),

  facebook: facebookSchema.superRefine((data, ctx) => {
    if (data.enabled) {
      if (!data.callbackUrl || !data.callbackUrl.trim()) {
        ctx.addIssue({
          path: ["callbackUrl"],
          message: "Callback URL is required",
          code: "custom",
        });
      } else {
        try {
          new URL(data.callbackUrl); // manual URL validation
        } catch {
          ctx.addIssue({
            path: ["callbackUrl"],
            message: "Invalid URL",
            code: "custom",
          });
        }
      }

      if (!data.clientId?.trim()) {
        ctx.addIssue({
          path: ["clientId"],
          message: "Client ID is required",
          code: "custom",
        });
      }

      if (!data.clientSecret?.trim()) {
        ctx.addIssue({
          path: ["clientSecret"],
          message: "Client Secret is required",
          code: "custom",
        });
      }
    }
  }),

  apple: appleSchema.superRefine((data, ctx) => {
    if (data.enabled) {
      if (!data.clientId?.trim()) {
        ctx.addIssue({
          path: ["clientId"],
          message: "Client ID is required",
          code: "custom",
        });
      }

      if (!data.teamId?.trim()) {
        ctx.addIssue({
          path: ["teamId"],
          message: "Team ID is required",
          code: "custom",
        });
      }

      if (!data.keyId?.trim()) {
        ctx.addIssue({
          path: ["keyId"],
          message: "Key ID is required",
          code: "custom",
        });
      }

      // Optional: Validate file upload
      // if (!data.serviceFile) {
      //   ctx.addIssue({ path: ["serviceFile"], message: "Service file is required", code: "custom" });
      // }
    }
  }),
});
