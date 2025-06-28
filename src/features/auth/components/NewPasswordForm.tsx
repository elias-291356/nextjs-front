"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/styles/components/ui";

import { useNewPasswordMutation } from "../hooks";
import { AuthWrapper } from "./AuthWrapper";
import { NewPasswordSchema, TypeNewPasswordSchema } from "../schemes";

export function NewPasswordForm() {
  const { theme } = useTheme();
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const form = useForm<TypeNewPasswordSchema>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const { newPassword, isLoadingNew } = useNewPasswordMutation();

  const onSubmit = (values: TypeNewPasswordSchema) => {
    if (recaptchaValue) {
      newPassword({ values, recaptcha: recaptchaValue });
    } else {
      toast.error("Bitte schließen Sie die reCAPTCHA-Verifizierung ab");
    }
  };

  return (
    <AuthWrapper
      heading="Neues Passwort"
      description="Erstellen Sie ein neues Passwort für Ihr Konto"
      backButtonLabel="Anmelden"
      backButtonHref="/auth/login"
    >
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 space-y-2"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passwort</FormLabel>
                <FormControl>
                  <Input
                    placeholder="******"
                    disabled={isLoadingNew}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={
                process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string
              }
              onChange={setRecaptchaValue}
              theme={theme === "light" ? "light" : "dark"}
            />
          </div>
          <Button type="submit" disabled={isLoadingNew}>
            Weiter
          </Button>
        </form>
      </FormProvider>
    </AuthWrapper>
  );
}
