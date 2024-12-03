import { createSlice } from "@reduxjs/toolkit";

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
        id: `${state.nextBotId++}`,
        status: "IDLE",
        currentOrder: null,
      });
    },
    removeBot: (state) => {
      if (state.bots.length > 0) {
        state.bots.pop();
      }
    },
    updateBotStatus: (state, action) => {},
  },
});

export default botSlice.reducer;
export const { addBot, removeBot, updateBotStatus } = botSlice.actions;
