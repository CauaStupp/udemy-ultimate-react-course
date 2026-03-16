import type { OrderType } from "@/@types/OrderType";
import { getOrder } from "@/services/apiRestaurant";
import { calcMinutesLeft, formatCurrency, formatDate } from "@/utils/helpers";
import {
  useFetcher,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router-dom";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import type { MenuType } from "@/@types/MenuType";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData() as OrderType;
  const {
    id,
    cart,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const fetcher = useFetcher<MenuType[]>();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-400 px-3 py-1 text-sm font-semibold uppercase text-red-50 tracking-wide">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-400 px-3 py-1 text-sm font-semibold uppercase text-green-50 tracking-wide">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 py-5 px-6 rounded-sm">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y-2 divide-stone-200 border-b-2 border-t-2 border-stone-200">
        {cart.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            ingrediets={
              fetcher.data?.find((e) => e.id === item.pizzaId)?.ingredients ??
              []
            }
            isLoadingIngredients={fetcher.state === "loading"}
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5 rounded-sm">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder />}
    </div>
  );
}

export async function orderLoader({ params }: LoaderFunctionArgs) {
  const order = await getOrder(params.orderId as string);
  return order;
}

export default Order;
