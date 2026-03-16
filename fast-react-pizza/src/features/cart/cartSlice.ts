import type { CartType } from "@/@types/OrderType";
import type { RootState } from "@/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type IncrementAndDecrementActionType = {
  pizzaId: number;
  amount?: number;
};

const initialState: { cart: CartType[] } = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    newItem(state, action: PayloadAction<CartType>) {
      const isExists = state.cart.some(
        (item) => item.pizzaId === action.payload.pizzaId,
      );
      const index = state.cart.findIndex(
        (item) => item.pizzaId === action.payload.pizzaId,
      );
      if (isExists) {
        state.cart[index].totalPrice += action.payload.unitPrice;
        state.cart[index].quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    increment(state, action: PayloadAction<IncrementAndDecrementActionType>) {
      const findItem =
        state.cart.find((item) => item.pizzaId === action.payload.pizzaId) ??
        state.cart[action.payload.pizzaId];
      findItem.quantity += action.payload.amount ? action.payload.amount : 1;
      findItem.totalPrice = findItem.quantity * findItem.unitPrice;
    },
    decrement(state, action: PayloadAction<IncrementAndDecrementActionType>) {
      const findItem =
        state.cart.find((item) => item.pizzaId === action.payload.pizzaId) ??
        state.cart[action.payload.pizzaId];
      findItem.quantity -= action.payload.amount ? action.payload.amount : 1;
      findItem.totalPrice = findItem.quantity * findItem.unitPrice;
      if (findItem.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, {
          type: action.type,
          payload: action.payload.pizzaId,
        });
    },
    updateItem() {},
    deleteItem(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    deleteAll(state) {
      state.cart = initialState.cart;
    },
  },
});

export const { decrement, deleteItem, deleteAll, increment, newItem } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartPrice = (state: RootState) =>
  state.cart.cart.reduce((a, b) => a + b.totalPrice, 0);
export const getTotalCartQuantity = (state: RootState) =>
  state.cart.cart.reduce((a, b) => a + b.quantity, 0);
export const getCart = (state: RootState) => state.cart.cart;
export const getCurrentQuantityById = (id: number) => (state: RootState) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// "reselect"
