import { createSlice } from "@reduxjs/toolkit";

type CustomerAction = {
  type: string;
  payload: {
    fullName: string;
    nationalID: string;
  };
};

type UpdateAction = {
  type: string;
  payload: string;
};

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialState,
  reducers: {
    create(state, action: CustomerAction) {
      state.fullName = action.payload.fullName;
      state.nationalID = action.payload.nationalID;
      state.createdAt = String(new Date().getDate());
    },
    update(state, action: UpdateAction) {
      state.fullName = action.payload;
    },
  },
});

export const { create, update } = customerSlice.actions;

export default customerSlice.reducer;
