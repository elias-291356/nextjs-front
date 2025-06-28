"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useVerificationMutation } from "../hooks";

import { AuthWrapper } from "./AuthWrapper";
import { Loading } from "@/shared/styles/components/ui/Loading";

export function NewVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { verification } = useVerificationMutation();

  useEffect(() => {
    verification(token);
  }, [token]);

  return (
    <AuthWrapper heading="E-Mail-Bestätigung">
      <div>
        <Loading />
      </div>
    </AuthWrapper>
  );
}
