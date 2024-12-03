import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
});

store.subscribe(() => console.log("Update State", store.getState()));

export default store;
