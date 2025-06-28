import { z } from "zod";

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Ungültige E-Mail-Adresse",
  }),
});

export type TypeResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
