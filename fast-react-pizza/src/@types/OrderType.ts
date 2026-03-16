export type CartType = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type OrderType = {
  id: string;
  customer: string;
  status: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: CartType[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
};
