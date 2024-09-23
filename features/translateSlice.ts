"use client";

import { createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  sentence: string;
  translation: string;
  translationResult: string;
  text: string;
}

const initialState: initialStateProps = {
  sentence: "",
  translation: "",
  translationResult: "",
  text: "",
};

const translateSlice = createSlice({
  name: "translate",
  initialState: initialState,
  reducers: {
    setSentence: (state, { payload }) => {
      state.sentence = payload;
    },
    setTranslation: (state, { payload }) => {
      state.translation = payload;
    },
    setTranslationResult: (state, { payload }) => {
      state.translationResult = payload;
    },
    setText: (state, { payload }) => {
      state.text = payload;
    },
  },
});

export const { setSentence, setTranslation, setTranslationResult, setText } =
  translateSlice.actions;

export default translateSlice.reducer;
