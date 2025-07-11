import { z } from "zod";

export const BusinessSettingsSchema = z.object({
  maintenanceMode: z.boolean(),

  companyName: z.string().min(1),
  companyEmail: z.string().email(),
  phone: z.string().min(1),
  country: z.string().min(1),
  address: z.string().optional(),

  latitude: z.string().optional(),
  longitude: z.string().optional(),

  logo: z.any().optional(), // z.instanceof(File) not always needed
  favicon: z.any().optional(),

  timezone: z.string(),
  // timeFormat: z.enum(["12hour", "24hour"]),
  currencySymbol: z.string(),
  currencyPosition: z.enum(["left", "right"]),
  digitAfterDecimal: z.number().int().min(0),
  copyrightText: z.string().optional(),
  // cookiesText: z.string().optional(),

  defaultCommissionRate: z.number().min(0),
  commissionRate: z.number().min(0),

  includeTax: z.boolean(),
  customerPreference: z.boolean(),
  orderInfoForAdmin: z.boolean(),
  orderNotificationType: z.enum(["firebase", "manual"]),
  freeServicesOrderOver: z.string().optional(),

  guestCheckout: z.boolean(),
  whoWillConfirmOrder: z.enum(["store", "deliveryman"]),

  additionalChargeName: z.string().optional(),
  additionalChargeAmount: z.string().optional(),

  partialPayment: z.boolean(),
  paymentMethods: z.enum(["cod", "digital_payment", "both"]),
});
