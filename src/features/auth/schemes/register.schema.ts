import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "Bitte geben Sie Ihren Namen ein",
    }),
    email: z.string().email({
      message: "Ungültige E-Mail-Adresse",
    }),
    password: z.string().min(6, {
      message: "Passwort mindestens 6 Zeichen",
    }),
    passwordRepeat: z.string().min(6, {
      message: "Bestätigungspasswort mindestens 6 Zeichen",
    }),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwörter stimmen nicht überein",
    path: ["passwordRepeat"],
  });

export type TypeRegisterSchema = z.infer<typeof RegisterSchema>;
