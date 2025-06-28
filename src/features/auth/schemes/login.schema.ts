import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Ungültige E-Mail-Adresse",
  }),
  password: z.string().min(6, {
    message: "Das Passwort muss mindestens 6 Zeichen lang sein",
  }),
  code: z.optional(z.string()),
});

export type TypeLoginSchema = z.infer<typeof LoginSchema>;
