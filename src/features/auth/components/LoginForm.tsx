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
import { LoginSchema, TypeLoginSchema } from "../schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { useState } from "react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { useLoginMutation } from "../hooks";
import Link from "next/link";

export function LoginForm() {
  const { theme } = useTheme();
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [isShowTwoFactor, setIsShowFactor] = useState(false);

  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const { login, isLoadingLogin } = useLoginMutation(setIsShowFactor);

  const onSubmit = (values: TypeLoginSchema) => {
    if (recaptchaValue) {
      login({ values, recaptcha: recaptchaValue });
    } else {
      toast.error("Bitte schließen Sie die reCAPTCHA-Verifizierung ab");
    }
  };
  return (
    <AuthWrapper
      heading="Einloggen"
      description="Bitte E-Mail und Passwort eingeben, um sich anzumelden."
      backButtonLabel="Noch kein Konto? Registrieren"
      backButtonHref="/auth/register"
      isShowSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 space-y-2"
        >
          {isShowTwoFactor && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123456"
                      disabled={isLoadingLogin}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {!isShowTwoFactor && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jakob@mail.com"
                        type="email"
                        disabled={isLoadingLogin}
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Passwort</FormLabel>
                      <Link
                        href="/auth/reset-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Passwort vergessen?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="******"
                        disabled={isLoadingLogin}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={
                process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string
              }
              onChange={setRecaptchaValue}
              theme={theme === "light" ? "light" : "dark"}
            />
          </div>
          <Button type="submit" disabled={isLoadingLogin}>
            Im Konto anmelden
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
