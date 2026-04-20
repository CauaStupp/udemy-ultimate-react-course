import type { CreateCabinType } from "@/@types/cabinsType";
import { createNewCabin, deleteCabin } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseFormReset } from "react-hook-form";
import { toast } from "react-toastify";

export function useDeleteCabinMutation() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: mutateDeleteCabin } = useMutation({
    mutationFn: ({ id, imagePath }: { id: number; imagePath: string }) =>
      deleteCabin(id, imagePath),
    onSuccess: () => {
      toast.success("Deleted with success!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    isDeleting,
    mutateDeleteCabin,
  };
}

export function useCreateCabinMutation(
  onClose?: UseFormReset<CreateCabinType>,
) {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: mutateCreateCabin } = useMutation({
    mutationFn: createNewCabin,
    onSuccess() {
      toast.success("Cabin created with success!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      onClose?.();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return {
    isCreating,
    mutateCreateCabin,
  };
}

export function useEditCabinMutation(onClose?: () => void) {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: mutateEditCabin } = useMutation({
    mutationFn: createNewCabin,
    onSuccess() {
      toast.success("Cabin updated with success!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      onClose?.();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return {
    isEditing,
    mutateEditCabin,
  };
}
