// validations/sms.ts
import { z } from "zod";

export const SmsConfigSchema = z.object({
  twilio: z.object({
    isActive: z.boolean(),
    sid: z.string().min(1, "SID is required"),
    messagingSid: z.string().min(1, "Messaging SID is required"),
    token: z.string().min(1, "Token is required"),
    from: z.string().min(1, "From is required"),
    otpTemplate: z.string().min(1, "OTP Template is required"),
  }),
  twoFactor: z.object({
    isActive: z.boolean(),
    apiKey: z.string().min(1, "API Key is required"),
  }),
});
