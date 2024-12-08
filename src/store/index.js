import { configureStore } from "@reduxjs/toolkit";
import botReducer from "./botSlice";
import orderReducer from "./orderSlice";

const store = configureStore({
  reducer: {
    bot: botReducer,
    order: orderReducer,
  },
});

export default store;
