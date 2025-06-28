"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Loading,
  Switch,
} from "@/shared/styles/components/ui";
import { useProfile } from "@/shared/hooks";

import { UserButton, UserButtonLoading } from "./UserButton";
import { SettingsSchema, TypeSettingsSchema } from "../schemas";
import { useUpdateProfileMutation } from "../hooks/useUpdateProfileMutation";

export function SettingsForm() {
  const { user, isLoading } = useProfile();

  const form = useForm<TypeSettingsSchema>({
    resolver: zodResolver(SettingsSchema),
    values: {
      name: user?.displayName || "",
      email: user?.email || "",
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    },
  });

  const { update, isLoadingUpdate } = useUpdateProfileMutation();

  const onSubmit = (values: TypeSettingsSchema) => {
    update(values);
    console.log(values);
  };

  if (!user) return null;

  return (
    <Card className="w-[400px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Profileinstellungen</CardTitle>
        {isLoading ? <UserButtonLoading /> : <UserButton user={user} />}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Loading />
        ) : (
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
                        placeholder="Ablona"
                        disabled={isLoadingUpdate}
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
                        placeholder="Theo@mail.com"
                        disabled={isLoadingUpdate}
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
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Zwei-Faktor-Authentifizierung</FormLabel>
                      <FormDescription>
                        Aktivieren Sie die Zwei-Faktor-Authentifizierung für Ihr
                        Konto
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoadingUpdate}>
                Speichern
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
