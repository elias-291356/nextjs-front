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

import { toast } from 'sonner'

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

  const onSubmit = (values: TypeRegisterSchema) => {
    if (recaptchaValue) {
      console.log(values)
    } else {
      toast.error('Пожалуйста, завершите reCAPTCHA')
    }
  };

  return (
    <AuthWrapper
      heading="Регистрация"
      description="Чтобы войти на сайт введите ваш email и пароль"
      backButtonLabel="Уже есть аккаунт? Войти"
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
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Иван" {...field} />
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
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ivan@example.com"
                    type="email"
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
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
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
                <FormLabel>Повторите пароль</FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.GOOGLE_RECAPTCHA_SECRET_KEY_CLIENT as string}
              onChange={setRecaptchaValue}
              theme={theme === "light" ? "light" : "dark"}
            />
          </div>
          <Button type="submit">Создать аккаунт</Button>
        </form>
      </Form>

    </AuthWrapper>
  );
}
