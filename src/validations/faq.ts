import { z } from "zod";

export const faqSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters long"),
  answer: z.string().min(10, "Answer must be at least 10 characters long"),
  order: z.number().min(1, "Order must be at least 1"),
});
