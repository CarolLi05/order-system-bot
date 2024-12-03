import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bots: [],
  botId: 1,
};

const botSlice = createSlice({
  name: "bots",
  initialState,
  reducers: {
    addBot: (state) => {},
    removeBot: (state) => {},
    updateBotStatus: (state, action) => {},
  },
});

export default botSlice.reducer;
export const { addBot, removeBot, updateBotStatus } = botSlice.actions;
