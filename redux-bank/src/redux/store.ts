import customerSlice from "../features/customers/customerSlice";
import accountSlice from "../features/accounts/accountSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    account: accountSlice,
    customer: customerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
