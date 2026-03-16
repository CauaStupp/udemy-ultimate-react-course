import type { CartType } from "@/@types/OrderType";
import { formatCurrency } from "@/utils/helpers";

type OrderItemProps = {
  item: CartType;
  ingrediets: string[];
  isLoadingIngredients: boolean;
};

function OrderItem({ item, ingrediets, isLoadingIngredients }: OrderItemProps) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 space-y-1">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">
        {isLoadingIngredients ? "Loading..." : ingrediets.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
