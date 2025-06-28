import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { userService } from "../services";
import { TypeSettingsSchema } from "../schemas";
import { toastMessageHandler } from "@/shared/styles/utils";

export function useUpdateProfileMutation() {
  const { mutate: update, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ["update profile"],
    mutationFn: (data: TypeSettingsSchema) => userService.updateProfile(data),
    onSuccess() {
      toast.success("Profil erfolgreich aktualisiert");
    },
    onError(error) {
      toastMessageHandler(error);
    },
  });

  return { update, isLoadingUpdate };
}
