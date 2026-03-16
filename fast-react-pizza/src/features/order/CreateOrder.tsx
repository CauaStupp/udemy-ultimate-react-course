import type { OrderType } from "@/@types/OrderType";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxExtends";
import { createOrder } from "@/services/apiRestaurant";
import Button from "@/ui/Button";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { deleteAll, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { useState } from "react";
import EmptyCart from "../cart/EmptyCart";
import { store } from "@/store";
import { formatCurrency } from "@/utils/helpers";
import { fetchAddress, getUser } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const formErrors = useActionData() as Record<string, string> | undefined;
  const { username, address, error, position, status } =
    useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const isSubmitting = navigation.state === "submitting";
  const isLoadingPosition = status === "loading";
  const cart = useAppSelector(getCart);
  const totalCartPrice = useAppSelector(getTotalCartPrice);
  const priorityPrice = Math.floor(withPriority ? totalCartPrice * 0.2 : 0);
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="text-3xl mb-8 font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-1 flex-col sm:flex-row sm:gap-3 sm:items-center">
          <label
            htmlFor="name"
            className="font-medium basis-0 sm:basis-30 whitespace-nowrap"
          >
            First Name
          </label>
          <input
            id="name"
            type="text"
            name="customer"
            placeholder="Name..."
            defaultValue={username}
            required
            className="input grow capitalize"
          />
        </div>

        <div className="mb-5 flex gap-1 flex-col sm:flex-row sm:gap-3 sm:items-center">
          <label
            htmlFor="phone"
            className="font-medium basis-0 whitespace-nowrap sm:basis-30"
          >
            Phone number
          </label>
          <div className="grow">
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="90 999-999"
              required
              className="input w-full"
            />
            {formErrors?.phone && (
              <p className="text-xs mt-2 p-2 rounded-sm bg-red-200 text-red-600">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex gap-1 flex-col sm:flex-row sm:gap-3 sm:items-center">
          <label
            htmlFor="address"
            className="font-medium basis-0 whitespace-nowrap sm:basis-30"
          >
            Address
          </label>
          <div className="grow">
            <div className="relative">
              <input
                id="address"
                type="text"
                name="address"
                placeholder="Street. Plac"
                required
                className="input w-full"
                defaultValue={address}
                disabled={isLoadingPosition}
              />
              {!position.latitude && !position.longitude && (
                <span className="absolute right-0.75 bottom-0.75 z-50 sm:bottom-0.75 sm:right-0.75 md:bottom-1.25 md:right-1.25">
                  <Button
                    onClick={() => dispatch(fetchAddress())}
                    typeButton="small"
                    type="button"
                    disabled={isLoadingPosition}
                  >
                    get position
                  </Button>
                </span>
              )}
            </div>

            {status === "error" && (
              <p className="text-xs mt-2 p-2 rounded-sm bg-red-200 text-red-600">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center mb-12 gap-2">
          <input
            type="checkbox"
            name="priority"
            value={withPriority ? "true" : "false"}
            onChange={(e) => setWithPriority(e.target.checked)}
            id="priority"
            className="h-5 w-5 rounded-sm accent-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <label htmlFor="priority" className="select-none font-medium">
            Want to give your order priority?
          </label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.latitude && position.longitude
              ? `${position.latitude},${position.longitude}`
              : ""
          }
        />

        <div className="mt-5">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function createOrderAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart as string),
    priority: data.priority === "true",
    phone: data.phone as string,
  };

  const errors = {} as Record<string, string>;
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order as OrderType);
  store.dispatch(deleteAll());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
