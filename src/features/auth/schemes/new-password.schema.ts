import { z } from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Passwort mindestens 6 Zeichen",
  }),
});

export type TypeNewPasswordSchema = z.infer<typeof NewPasswordSchema>;
