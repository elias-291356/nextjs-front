"use client";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/styles/components/ui";
import { AuthWrapper } from "./AuthWrapper";

import { Input } from "@/shared/styles/components/ui/Input";
import { RegisterSchema, TypeRegisterSchema } from "../schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { toast } from "sonner";
import { useRegisterMutation } from "../hooks";

export function RegisterForm() {
  const { theme } = useTheme();
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const form = useForm<TypeRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
  });
  const { register, isLoadingRegister } = useRegisterMutation();

  const onSubmit = (values: TypeRegisterSchema) => {
    if (recaptchaValue) {
      register({ values, recaptcha: recaptchaValue });
    } else {
      toast.error("Bitte schließen Sie die reCAPTCHA-Prüfung ab");
    }
  };

  return (
    <AuthWrapper
      heading="Registrierung"
      description="Um sich auf der Website anzumelden, geben Sie bitte Ihre E-Mail-Adresse und Ihr Passwort ein"
      backButtonLabel="Schon ein Konto? Anmelden"
      backButtonHref="/auth/login"
      isShowSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 space-y-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jonas"
                    disabled={isLoadingRegister}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jonas@mail.com"
                    type="email"
                    disabled={isLoadingRegister}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passwort</FormLabel>
                <FormControl>
                  <Input
                    placeholder="******"
                    type="password"
                    disabled={isLoadingRegister}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordRepeat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passwort wiederholen</FormLabel>
                <FormControl>
                  <Input
                    placeholder="******"
                    type="password"
                    disabled={isLoadingRegister}
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
          <Button type="submit" disabled={isLoadingRegister}>
            Konto erstellen
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
