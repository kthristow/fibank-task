import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .max(30, "Username must be at most 30 characters"),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(30, "Password must be at most 30 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;