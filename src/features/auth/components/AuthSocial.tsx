"use client";

import { Button } from "@/shared/styles/components/ui";

import { FaGoogle } from "react-icons/fa";

export function AuthSocial() {
  return (
    <>
          <div className="flex justify-center">
        <Button>
          <FaGoogle className="mr-2 size-4" />
          Google
        </Button>
      </div>
      
    </>
  );
}
