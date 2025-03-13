import { z } from "zod";

export const EmailPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .trim()
    .toLowerCase(),
  
  password: z.string()
    .min(1, "Password is required"),
});

export type EmailPasswordSchemaType = z.infer<typeof EmailPasswordSchema>;
