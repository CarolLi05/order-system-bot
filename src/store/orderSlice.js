import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  orderId: 0,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {},
    updateOrderStatus: (state, action) => {}
  },
});

export default orderSlice.reducer;
export const { addOrder, updateOrderStatus } = orderSlice.actions;
