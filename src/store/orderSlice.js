import { createSlice } from "@reduxjs/toolkit";
import { PENDING } from "../util/status";

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
        status: PENDING,
        createdAt: Date.now(),
      };

      if (action.payload === "VIP") {
        const lastVipIndex = state.orders.findLastIndex(
          (order) => order.status === PENDING && order.type === "VIP",
        );
        state.orders.splice(lastVipIndex + 1, 0, newOrder);
      } else {
        state.orders.push(newOrder);
      }

      state.nextOrderId += 1;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, botId, orderStatus } = action.payload;
      const order = state.orders.find((order) => order.id === orderId);
      if (order) {
        order.status = orderStatus;
        order.botProcessing = botId;
      }
    },
  },
});

export default orderSlice.reducer;
export const { addOrder, updateOrderStatus } = orderSlice.actions;
