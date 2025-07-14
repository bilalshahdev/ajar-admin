import { z } from "zod";

export const MapApiSchema = z.object({
  clientKey: z.string().min(1, "Client key is required"),
  serverKey: z.string().min(1, "Server key is required"),
});
