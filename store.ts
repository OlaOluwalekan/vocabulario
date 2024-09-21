"use client";

import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./features/generalSlice";
import chatSlice from "./features/chatSlice";

const store = configureStore({
  reducer: {
    general: generalSlice,
    chat: chatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
