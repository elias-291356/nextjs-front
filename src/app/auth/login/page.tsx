import { LoginForm } from "@/features/auth/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sich in das Konto einloggen",
};

export default function LoginPage() {
  return <LoginForm />;
}
