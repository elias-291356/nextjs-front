import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { TypeNewPasswordSchema } from "../schemes";
import { passwordRecoveryService } from "../services/password-recovery.service";
import { toastMessageHandler } from "@/shared/styles/utils";

export function useNewPasswordMutation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const { mutate: newPassword, isPending: isLoadingNew } = useMutation({
    mutationKey: ["new password"],
    mutationFn: ({
      values,
      recaptcha,
    }: {
      values: TypeNewPasswordSchema;
      recaptcha: string;
    }) => passwordRecoveryService.new(values, token, recaptcha),
    onSuccess() {
      toast.success("Passwort wurde erfolgreich geändert", {
        description: "Sie können sich jetzt in Ihr Konto anmelden.",
      });
      router.replace("/dashboard/settings");
    },
    onError(error) {
      toastMessageHandler(error);
    },
  });

  return { newPassword, isLoadingNew };
}
