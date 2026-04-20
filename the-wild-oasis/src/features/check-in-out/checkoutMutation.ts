import { updateBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCheckoutMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess(data) {
      toast.success(`Booking #${data.id} checked out with success`);
      queryClient.invalidateQueries({ exact: true });
    },

    onError() {
      toast.error("There was an error while checking in");
    },
  });

  return mutation;
}
