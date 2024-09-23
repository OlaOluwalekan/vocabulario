"use client";

import {
  setSentence,
  setTranslation,
  setTranslationResult,
} from "@/features/translateSlice";
import { generateEnglishSentence } from "@/utils/actions/gemini";
import { parseMarkdownToText } from "@/utils/helpers";
import useLocalStorage from "@/utils/local-storage";
import clsx from "clsx";
import { useEffect, useTransition } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const TranslateHeader = ({ words }: { words: string }) => {
  const [pending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const { getFromLocalStorage, addToLocalStorage } = useLocalStorage();

  useEffect(() => {
    const localSentence = getFromLocalStorage("sentence");
    dispatch(setSentence(localSentence));
    const localTranslation = getFromLocalStorage("translation");
    dispatch(setTranslation(localTranslation));
    const localTranslationResult = getFromLocalStorage("translationResult");
    dispatch(setTranslationResult(localTranslationResult));
  }, []);

  const handleClick = () => {
    startTransition(() => {
      generateEnglishSentence(words).then((res) => {
        if (res.success) {
          const text = parseMarkdownToText(res.data as string);
          dispatch(setSentence(text));
          addToLocalStorage("sentence", text);
        } else {
          toast.error(res.message);
        }
      });
    });
  };

  return (
    <section className="flex gap-5 justify-between items-center py-3">
      <p>Click the generate button to generate random sentences to translate</p>
      <button
        className={clsx(
          "btn btn-primary",
          pending
            ? "cursor-not-allowed opacity-70"
            : "cursor-pointer opacity-100"
        )}
        onClick={handleClick}
        disabled={pending}
      >
        {pending ? "Generating..." : "Generate"}
      </button>
    </section>
  );
};

export default TranslateHeader;
