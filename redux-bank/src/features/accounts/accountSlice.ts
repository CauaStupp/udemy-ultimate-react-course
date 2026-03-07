import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export type AccountType = {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
};

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    withdraw(state, action: PayloadAction<string>) {
      state.balance -= Number(action.payload);
    },
    requestLoan: {
      prepare(amount: string, purpose: string) {
        return {
          payload: {
            amount,
            purpose,
          },
          meta: undefined,
          error: undefined,
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = Number(action.payload.amount);
        state.loanPurpose = action.payload.purpose;
        state.balance += Number(action.payload.amount);
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deposit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deposit.fulfilled, (state, action: PayloadAction<number>) => {
        state.balance += action.payload;
        state.isLoading = false;
      })
      .addCase(deposit.rejected, (state) => {
        state.isLoading = false;
        alert("Erro ao converter moeda!");
      });
  },
});

export const { payLoan, requestLoan, withdraw } = accountSlice.actions;

export const deposit = createAsyncThunk(
  "account/deposit",
  async ({ amount, currency }: { amount: string; currency: string }) => {
    if (currency === "USD") return amount;

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
    );
    const data = await res.json();
    return data.rates.USD;
  },
);

export default accountSlice.reducer;
