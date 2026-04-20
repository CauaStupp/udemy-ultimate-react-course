import { deleteBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function deleteBookingMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess() {
      toast.success(`Deleted with success`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError() {
      toast.error("There was an error while deleting booking");
    },
  });

  return mutation;
}
