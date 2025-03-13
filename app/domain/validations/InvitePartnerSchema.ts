import { z } from "zod";

export const InvitePartnerSchema = z.object({
  username: z.string().min(3),
});

export type InvitePartnerSchemaType = z.infer<typeof InvitePartnerSchema>;