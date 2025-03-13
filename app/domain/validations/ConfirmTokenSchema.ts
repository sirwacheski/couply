import { z } from "zod";

const ConfirmTokenSchema = z.object({
  email: z.string().email(),
  code: z.string().min(6).max(6),
});

export default ConfirmTokenSchema;