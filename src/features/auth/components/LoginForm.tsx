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

export function LoginForm() {
  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: TypeLoginSchema) => {
    console.log(values);
  };
  return (
    <AuthWrapper
      heading="Войти"
      description="Чтобы войти на сайт введите ваш email и пароль"
      backButtonLabel="Еще нет аккаунта? Регистрация"
      backButtonHref="/auth/register"
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

          <div className="flex justify-center"></div>
          <Button type="submit">Войти аккаунт</Button>
        </form>
      </Form>
      RegisterForm
    </AuthWrapper>
  );
}
