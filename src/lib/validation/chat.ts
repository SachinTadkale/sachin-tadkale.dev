import { z } from "zod";

export const chatRequestSchema = z.object({
  message: z.string().min(1, "User Message cannot be empty").trim(),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
        timestamp: z.string(),
      })
    )
    .optional(),
});
