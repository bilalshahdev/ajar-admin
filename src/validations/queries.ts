import { z } from "zod";

export const QuerySchema = z.object({
  sentBy: z.string(),
  sentTo: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
});

export type QueryType = z.infer<typeof QuerySchema>;
