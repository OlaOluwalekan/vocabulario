"use client";

import { MouseEvent, useRef } from "react";
import useFocusedInput from "./Focused";
import clsx from "clsx";

const keys = ["ñ", "á", "é", "í", "ó", "ú", "ü"];

const KeyBoard = ({
  styleClass,
  keyStyle,
}: {
  styleClass?: string;
  keyStyle?: string;
}) => {
  const focusedInput = useFocusedInput();
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const handleCharacterClick = (char: string) => {
    if (focusedInput) {
      inputRef.current = focusedInput;

      const input = inputRef.current;
      const cursorPosition = input.selectionStart || 0;

      let newValue =
        focusedInput.value.slice(0, cursorPosition) +
        char +
        focusedInput.value.slice(cursorPosition);
      // console.log(newValue);
      focusedInput.value = newValue;
      // input.selectionStart = cursorPosition;
      focusedInput.focus();
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={clsx(
        "bg-base-300 justify-center items-center py-2 rounded-md",
        styleClass
          ? styleClass
          : "absolute right-[-60px] top-0 flex flex-col w-[50px] gap-2"
      )}
    >
      {keys.map((key) => {
        return (
          <button
            key={key}
            className={clsx(
              "text-primary-content bg-primary aspect-square rounded-md hover:bg-slate-600",
              keyStyle ? keyStyle : "w-[40px]"
            )}
            onClick={() => handleCharacterClick(key)}
            onMouseDown={handleMouseDown}
            type="button"
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};

export default KeyBoard;
