import { z } from "zod";

export const CreateMuralSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
});

export type CreateMuralSchemaType = z.infer<typeof CreateMuralSchema>;