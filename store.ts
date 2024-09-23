"use client";

import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./features/generalSlice";
import chatSlice from "./features/chatSlice";
import translateSlice from "./features/translateSlice";

const store = configureStore({
  reducer: {
    general: generalSlice,
    chat: chatSlice,
    translate: translateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
