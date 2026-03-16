import Button from "@/ui/Button";
import LinkButton from "@/ui/LinkButton";
import CartItem from "./CartItem";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxExtends";
import EmptyCart from "./EmptyCart";
import { deleteAll, getCart } from "./cartSlice";

function Cart() {
  const username = useAppSelector((state) => state.user.username);
  const cart = useAppSelector(getCart);
  const dispatch = useAppDispatch();

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold capitalize">
        Your cart, {username}
      </h2>

      <ul className="divide-y-2 mt-3 divide-stone-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-4">
        <Button to="/order/new">Order pizzas</Button>
        <Button typeButton="secondary" onClick={() => dispatch(deleteAll())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
