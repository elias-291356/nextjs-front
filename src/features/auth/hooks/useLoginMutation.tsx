import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

import { TypeLoginSchema } from "../schemes";
import { authService } from "../services";
import { toastMessageHandler } from "@/shared/styles/utils";

export function useLoginMutation() {
  const router = useRouter();

  const { mutate: login, isPending: isLoadingLogin } = useMutation({
    mutationKey: ["login user"],
    mutationFn: ({
      values,
      recaptcha,
    }: {
      values: TypeLoginSchema;
      recaptcha: string;
    }) => authService.login(values, recaptcha),
    onSuccess(data: any) {
      if (data.message) {
        toastMessageHandler(data);
      } else {
        toast.success("Успешная авторизация");
        router.push("/dashboard/settings");
      }
    },
    onError(error) {
      toastMessageHandler(error);
    },
  });

  return { login, isLoadingLogin };
}
