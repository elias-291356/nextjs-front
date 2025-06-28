import { NewVerificationForm } from "@/features/auth/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Mail-Bestätigung",
};

export default function NewVerificationPage() {
  return <NewVerificationForm />;
}
