import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  nextOrderId: 1,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        id: state.nextOrderId,
        type: action.payload,
        status: "PENDING",
        createdAt: Date.now(),
      };

      if (action.payload === "VIP") {
        const lastVipIndex = state.orders.findLastIndex(
          (order) => order.status === "PENDING" && order.type === "VIP",
        );
        state.orders.splice(lastVipIndex + 1, 0, newOrder);
      } else {
        state.orders.push(newOrder);
      }

      state.nextOrderId += 1;
    },
    updateOrderStatus: (state, action) => {},
  },
});

export default orderSlice.reducer;
export const { addOrder, updateOrderStatus } = orderSlice.actions;
