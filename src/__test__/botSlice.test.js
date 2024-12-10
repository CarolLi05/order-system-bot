import { beforeEach, describe, it, expect } from "vitest";
import botReducer, {
  addBot,
  removeBot,
  assignOrderToBot,
  clearBotOrder,
} from "../store/botSlice";
import { IDLE, PROCESSING } from "../util/status";

describe("botSlice", () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      bots: [],
      nextBotId: 1,
    };
  });

  it("新增一個機器人", () => {
    const action = addBot();
    const state = botReducer(initialState, action);

    expect(state.bots.length).toBe(1);
    expect(state.bots[0].status).toBe(IDLE);
  });

  it("刪除一個機器人", () => {
    initialState = {
      bots: [{ id: 1, status: IDLE }],
      nextBotId: 2,
    };
    const action = removeBot();
    const state = botReducer(initialState, action);

    expect(state.bots.length).toBe(0);
  });

  it("機器人正在處理一張訂單", () => {
    initialState = {
      bots: [{ id: 1, status: IDLE }],
      nextBotId: 2,
    };
    const action = assignOrderToBot({
      botId: 1,
      orderId: 1,
    });
    const state = botReducer(initialState, action);

    expect(state.bots[0].status).toBe(PROCESSING);
    expect(state.bots[0].currentOrder).toBe(1);
  });

  it("機器人完成一張訂單", () => {
    initialState = {
      bots: [{ id: 1, status: PROCESSING, currentOrder: 1 }],
      nextBotId: 2,
    };
    const action = clearBotOrder(1);
    const state = botReducer(initialState, action);

    expect(state.bots[0].status).toBe(IDLE);
  });
});
