import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  orderId: 1,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        id: state.orderId++,
        type: action.payload,
        status: "PENDING",
        createdAt: Date.now(),
      };

      if (action.payload === "VIP") {
        const lastVipIndex = state.orders.findLastIndex(
          (order) => order.status === "PENDING" && order.type === "VIP",
        );
        state.orders.splice(lastVipIndex + 1, 0, newOrder);
      }

      if (action.payload === "Normal") {
        state.orders.push(newOrder)
      }
    },
    updateOrderStatus: (state, action) => {},
  },
});

export default orderSlice.reducer;
export const { addOrder, updateOrderStatus } = orderSlice.actions;
