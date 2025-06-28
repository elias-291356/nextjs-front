"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useResetPasswordMutation } from "../hooks";
import { ResetPasswordSchema, TypeResetPasswordSchema } from "../schemes";

import { AuthWrapper } from "./AuthWrapper";
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/styles/components/ui";

export function ResetPasswordForm() {
  const { theme } = useTheme();
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const form = useForm<TypeResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { reset, isLoadingReset } = useResetPasswordMutation();

  const onSubmit = (values: TypeResetPasswordSchema) => {
    if (recaptchaValue) {
      reset({ values, recaptcha: recaptchaValue });
    } else {
      toast.error("Bitte schließen Sie die reCAPTCHA-Prüfung ab");
    }
  };

  return (
    <AuthWrapper
      heading="Passwort zurücksetzen"
      description="Geben Sie Ihre E-Mail-Adresse ein, um das Passwort zurückzusetzen"
      backButtonLabel="Zum Konto anmelden"
      backButtonHref="/auth/login"
    >
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jonas@mail.com"
                    disabled={isLoadingReset}
                    type="email"
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
          <Button type="submit" disabled={isLoadingReset}>
            Zurücksetzen
          </Button>
        </form>
      </FormProvider>
    </AuthWrapper>
  );
}
