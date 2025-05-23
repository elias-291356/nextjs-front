"use client";

import { Button } from "@/shared/styles/components/ui";

import { FaGoogle, FaYandex } from "react-icons/fa";

export function AuthSocial() {
  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <Button>
          <FaGoogle className="mr-2 size-4" />
          Google
        </Button>
      </div>
      <div className="relative mb-2 space-y-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Или</span>
        </div>
      </div>
    </>
  );
}
