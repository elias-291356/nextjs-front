
"use client";
import { Button } from "@/shared/styles/components/ui";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


import { FaGoogle } from "react-icons/fa";
import { authService } from "../services";

export function AuthSocial() {
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationKey: ["oauth by provider"],
    mutationFn: async (provider: "google") =>
      await authService.oauthByProvider(provider),
  });

  const onClick = async (provider: "google") => {
    const response = await mutateAsync(provider);

    if (response) {
      router.replace(response.url);
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <Button onClick={() => onClick("google")} variant="outline">
          <FaGoogle className="mr-2 size-4" />
          Google
        </Button>
      </div>
    </>
  );
}
