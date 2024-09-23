"use client";

import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import MarkDown from "react-markdown";
import Link from "next/link";
import {
  setSentence,
  setText,
  setTranslation,
  setTranslationResult,
} from "@/features/translateSlice";
import useLocalStorage from "@/utils/local-storage";

const TranslateFeedback = () => {
  const { translationResult } = useSelector(
    (store: RootState) => store.translate
  );
  const dispatch = useDispatch();
  const jsonStr = translationResult.replace(/```json|```/g, "").trim();
  let translationJson;
  const { removeFromLocalStorage } = useLocalStorage();

  try {
    translationJson = JSON.parse(jsonStr);
  } catch (error) {
    translationJson = {};
  }

  const handleClear = () => {
    removeFromLocalStorage("sentence");
    removeFromLocalStorage("translation");
    removeFromLocalStorage("translationResult");
    dispatch(setSentence(""));
    dispatch(setTranslation(""));
    dispatch(setTranslationResult(""));
    dispatch(setText(""));
  };

  return (
    <div>
      {translationResult && (
        <div className="relative">
          <h3 className="text-lg font-semibold">Feedback</h3>
          <div className="flex text-3xl font-bold w-20 aspect-square justify-center items-center rounded-full absolute top-[-20px] left-0 right-0 mx-auto bg-green-500 text-white">
            <article className="flex items-start">
              {translationJson.grade} <span className="text-base">%</span>
            </article>
          </div>
          <div className="w-full px-2 border-2 py-8 mb-10 mt-2">
            <MarkDown
              components={{
                a({ children, ...props }) {
                  return (
                    <Link
                      href={props.href as string}
                      {...props}
                      className="text-primary underline"
                    >
                      {children}
                    </Link>
                  );
                },
              }}
            >
              {translationJson.feedback}
            </MarkDown>
            <div className="mt-3">
              <h3 className="font-semibold">Correct Translation:</h3>
              <p className="italic text-primary">
                {translationJson.translation}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="w-40 py-2 bg-red-600 text-white mb-10 rounded"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslateFeedback;
