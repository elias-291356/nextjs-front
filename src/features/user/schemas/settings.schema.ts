import { z } from "zod";

export const SettingsSchema = z.object({
  name: z.string().min(1, {
    message: "Bitte geben Sie Ihren Namen ein",
  }),
  email: z.string().email({
    message: "Ungültige E-Mail-Adresse",
  }),
  isTwoFactorEnabled: z.boolean(),
});

export type TypeSettingsSchema = z.infer<typeof SettingsSchema>;
