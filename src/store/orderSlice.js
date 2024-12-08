import { createSlice } from "@reduxjs/toolkit";
import { PENDING, COMPLETED } from "../util/status";

const initialState = {
  orders: [],
  nextOrderId: 1,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const { type, createdTime } = action.payload;
      const newOrder = {
        id: state.nextOrderId,
        type: type,
        status: PENDING,
        createdAt: createdTime,
        processingBot: null,
        startedAt: null,
      };

      state.orders.push(newOrder);
      state.nextOrderId += 1;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, botId, status, startedAt, completedAt } = action.payload;
      const order = state.orders.find((order) => order.id === orderId);
      if (order) {
        order.status = status;
        order.processingBot = botId;

        if (startedAt) {
          order.startedAt = startedAt;
        }

        if (completedAt) {
          order.completedAt = completedAt;
        }

        if (status === COMPLETED) {
          order.processingBot = null;
        }
      }
    },
    resetProcessingOrder: (state, action) => {
      const order = state.orders.find(
        (o) => o.processingBot === action.payload,
      );
      if (order) {
        order.status = PENDING;
        order.processingBot = null;
        order.startedAt = null;
        order.completedAt = null;
      }
    },
  },
});

export default orderSlice.reducer;
export const { addOrder, updateOrderStatus, resetProcessingOrder } =
  orderSlice.actions;
