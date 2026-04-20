import { updateBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

type MutationFnProps = {
  bookingId: number;
  breakfast?: {
    has_breakfast: boolean;
    extra_price: number;
    total_price: number;
  };
};

export function useCheckingMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ bookingId, breakfast }: MutationFnProps) =>
      updateBooking(bookingId, {
        status: "checked-in",
        ispaid: true,
        ...(breakfast ?? {}),
      }),

    onSuccess(data) {
      toast.success(`Booking #${data.id} checked in with success`);
      queryClient.invalidateQueries({ exact: true });
      navigate("/");
    },

    onError() {
      toast.error("There was an error while checking in");
    },
  });
}
