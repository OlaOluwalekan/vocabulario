import { createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  chatPopIsOpen: boolean;
}

const initialState: initialStateProps = {
  chatPopIsOpen: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    setChatPopupIsOpen: (state, { payload }) => {
      state.chatPopIsOpen = payload;
    },
  },
});

export const { setChatPopupIsOpen } = chatSlice.actions;

export default chatSlice.reducer;
