import { updateSetting } from "@/services/apiSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function settingsUpdateMutation() {
  const queryClient = useQueryClient();
  const {
    data: updateData,
    isPending: isUpdating,
    mutate,
  } = useMutation({
    mutationFn: updateSetting,
    onSuccess() {
      toast.success("Settings updated with success!");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { updateData, isUpdating, mutate };
}
