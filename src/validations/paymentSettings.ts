import { z } from "zod";

export const PaymentSettingsSchema = z.object({
  cash: z.boolean(),
  digitalPayment: z.boolean(),
  stripe: z.boolean(),
  stripeEnvironment: z.enum(["live", "sandbox"]),
  apiKey: z.string().min(1),
  publishKey: z.string().min(1),
  paymentGatewayTitle: z.string().min(1),
  logo: z.any().optional(),
});
