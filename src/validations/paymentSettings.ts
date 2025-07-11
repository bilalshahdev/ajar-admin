import { z } from "zod";

export const PaymentSettingsSchema = z.object({
  cash: z.boolean(),
  digitalPayment: z.boolean(),
  stripeEnabled: z.boolean(),

  stripeEnv: z.enum(["live", "sandbox"]),
  stripeApiKey: z.string().min(1),
  stripePublishKey: z.string().min(1),
  stripeTitle: z.string().min(1),
  stripeLogo: z.any().optional(),
});
