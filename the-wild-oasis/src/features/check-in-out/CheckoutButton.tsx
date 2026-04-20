import Button from "@/ui/Button";
import { useCheckoutMutation } from "./checkoutMutation";

function CheckoutButton({ bookingId }: { bookingId: number }) {
  const { mutate: checkout, isPending } = useCheckoutMutation();

  return (
    <Button
      $variation="primary"
      $size="small"
      disabled={isPending}
      onClick={() => checkout(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
