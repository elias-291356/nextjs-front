import { RegisterForm } from "@/features/auth/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ein Konto erstellen",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
