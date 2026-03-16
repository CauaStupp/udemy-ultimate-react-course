import type { MenuType } from "@/@types/MenuType";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxExtends";
import Button from "@/ui/Button";
import { formatCurrency } from "@/utils/helpers";
import { getCurrentQuantityById, newItem } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItem from "../cart/UpdateItem";

function MenuItem({ pizza }: { pizza: MenuType }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const pizzaQuantity = useAppSelector(getCurrentQuantityById(id));

  const dispatch = useAppDispatch();

  function handleAddToCart() {
    if (!id || !name || !unitPrice) return null;

    dispatch(
      newItem({
        pizzaId: id,
        name,
        unitPrice,
        quantity: 1,
        totalPrice: unitPrice * 1,
      }),
    );
  }

  return (
    <li className="flex gap-4 py-3">
      <img
        src={imageUrl}
        alt={name}
        className={`rounded-sm object-cover h-26 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col grow">
        <p className="font-medium text-xl mb-0.5">{name}</p>
        <p className="text-sm italic capitalize text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex justify-between items-center">
          {!soldOut ? (
            <p className="text-sm font-medium">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-red-400 text-sm uppercase font-medium">
              Sold out
            </p>
          )}

          {!soldOut && pizzaQuantity > 0 && (
            <div className="flex gap-4">
              <UpdateItem pizzaId={pizza.id} quantity={pizzaQuantity} />
              <DeleteItem id={id} typeButton="small" />
            </div>
          )}

          {!soldOut && !pizzaQuantity && (
            <Button typeButton="small" type="button" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
