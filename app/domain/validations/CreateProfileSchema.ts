import { z } from "zod";

export const CreateProfileSchema = z.object({
  birthdate: z.date({ required_error: "Birthdate is required" }),
  
  name: z.string()
    .min(3, "Name is required"),

  username: z.string()
    .min(1, "Username is required")
    .regex(/^[^\s]+$/, "Username cannot contain spaces"),
});

export type CreateProfileSchemaType = z.infer<typeof CreateProfileSchema>;