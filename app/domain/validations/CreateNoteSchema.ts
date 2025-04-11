import { z } from "zod";

export const CreateNoteSchema = z.object({
  title: z
    .string(),

  content: z
    .string()
    .optional(),

  created_at: z
   .string()
   .optional(),
});

export type CreateNoteSchemaType = z.infer<typeof CreateNoteSchema>;