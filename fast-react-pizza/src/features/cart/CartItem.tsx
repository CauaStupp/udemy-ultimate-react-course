import { formatCurrency } from "@/utils/helpers";
import type { CartType } from "@/@types/OrderType";
import UpdateItem from "./UpdateItem";
import DeleteItem from "./DeleteItem";

function CartItem({ item }: { item: CartType }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
        <UpdateItem pizzaId={pizzaId} quantity={quantity} />

        <DeleteItem id={pizzaId} typeButton="small" />
      </div>
    </li>
  );
}

export default CartItem;
