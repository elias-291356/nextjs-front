import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { TypeResetPasswordSchema } from "../schemes/reset-password.schema";
import { passwordRecoveryService } from "../services/password-recovery.service";
import { toastMessageHandler } from "@/shared/styles/utils";

export function useResetPasswordMutation() {
  const { mutate: reset, isPending: isLoadingReset } = useMutation({
    mutationKey: ["reset password"],
    mutationFn: ({
      values,
      recaptcha,
    }: {
      values: TypeResetPasswordSchema;
      recaptcha: string;
    }) => passwordRecoveryService.reset(values, recaptcha),
    onSuccess() {
      toast.success("Bitte überprüfen Sie Ihre E-Mails", {
        description:
          "Ein Bestätigungslink wurde an Ihre E-Mail-Adresse gesendet.",
      });
    },
    onError(error) {
      toastMessageHandler(error);
    },
  });

  return { reset, isLoadingReset };
}
