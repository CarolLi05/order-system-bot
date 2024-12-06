import { createSlice } from "@reduxjs/toolkit";
import { IDLE, PROCESSING } from "../util/status";

const initialState = {
  bots: [],
  nextBotId: 1,
};

const botSlice = createSlice({
  name: "bots",
  initialState,
  reducers: {
    addBot: (state) => {
      state.bots.push({
        id: state.nextBotId,
        status: IDLE,
      });

      state.nextBotId += 1;
    },
    removeBot: (state) => {
      if (state.bots.length > 0) {
        state.bots.pop();
      }
    },
    assignOrderToBot: (state, action) => {
      const { orderId, botId } = action.payload;
      const bot = state.bots.find((bot) => bot.id === botId);
      if (!bot) return;
      bot.status = PROCESSING;
      bot.currentOrder = orderId;
    },
    clearBotOrder: (state, action) => {
      const botId = action.payload;
      const bot = state.bots.find((bot) => bot.id === botId);
      if (!bot) return;
      bot.status = IDLE;
      delete bot.currentOrder;
    },
  },
});

export default botSlice.reducer;
export const { addBot, removeBot, assignOrderToBot, clearBotOrder } =
  botSlice.actions;
