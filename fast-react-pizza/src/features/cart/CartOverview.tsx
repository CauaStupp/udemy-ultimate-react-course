import { useAppSelector } from "@/hooks/reduxExtends";
import { formatCurrency } from "@/utils/helpers";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
  const totalCartQuantity = useAppSelector(getTotalCartQuantity);
  const totalPrice = useAppSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;
  return (
    <div className="bg-stone-800 text-stone-200 flex items-center justify-between uppercase px-4 py-4 text-sm md:text-base sm:px-6">
      <p className="text-stone-300 font-semibold flex space-x-4 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
