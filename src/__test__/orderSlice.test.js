import { beforeEach, describe, it, expect } from "vitest";
import orderReducer, {
  addOrder,
  updateOrderStatus,
  resetProcessingOrder,
} from "../store/orderSlice";
import { COMPLETED, PENDING, PROCESSING } from "../util/status";

describe("orderSlice", () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      orders: [],
      nextOrderId: 1,
    };
  });

  it("新增一筆訂單", () => {
    const action = addOrder({ type: "NORMAL", time: Date.now() });
    const state = orderReducer(initialState, action);

    expect(state.orders.length).toBe(1);
    expect(state.orders[0].status).toBe(PENDING);
  });

  it("有一筆訂單正在被處理，處理的機器人為 Bot #1", () => {
    initialState = {
      orders: [
        {
          id: 1,
          type: "NORMAL",
          status: PENDING,
          processingBot: null,
          createdAt: Date.now(),
          startedAt: null,
        },
      ],
      nextOrderId: 2,
    };
    const action = updateOrderStatus({
      orderId: 1,
      status: PROCESSING,
      botId: 1,
      startedAt: Date.now(),
    });
    const state = orderReducer(initialState, action);

    expect(state.orders[0].status).toBe(PROCESSING);
    expect(state.orders[0].processingBot).toBe(1);
  });

  it("完成了一筆訂單", () => {
    initialState = {
      orders: [
        {
          id: 1,
          type: "NORMAL",
          status: PROCESSING,
          processingBot: 1,
          createdAt: Date.now(),
          startedAt: Date.now(),
        },
      ],
      nextOrderId: 2,
    };
    const action = updateOrderStatus({
      orderId: 1,
      status: COMPLETED,
      botId: 1,
      completedAt: Date.now(),
    });
    const state = orderReducer(initialState, action);

    expect(state.orders[0].status).toBe(COMPLETED);
    expect(state.orders[0].processingBot).toBe(null);
  });

  it("有一筆訂單狀態為 PROCESSING，處理的機器人為 Bot #1，機器人被刪除後訂單退回 PENDING 狀態", () => {
    initialState = {
      orders: [
        {
          id: 1,
          type: "NORMAL",
          status: PROCESSING,
          processingBot: 1,
          createdAt: Date.now(),
          startedAt: Date.now(),
        },
      ],
      nextOrderId: 2,
    };
    const action = resetProcessingOrder(1);
    const state = orderReducer(initialState, action);

    expect(state.orders[0].status).toBe(PENDING);
    expect(state.orders[0].processingBot).toBe(null);
  });
});
