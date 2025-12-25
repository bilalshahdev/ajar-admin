import { z } from "zod";

export const SmtpMailSchema = z.object({
  enabled: z.boolean(),
  mailerName: z.string().min(1),
  driver: z.string().min(1),
  host: z.string().min(1),
  port: z.coerce.number().min(1),
  userName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  encryption: z.enum(["tls", "ssl", "none"]),
});
