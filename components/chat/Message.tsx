"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlayCircle, FaStopCircle } from "react-icons/fa";
import { parseMarkdownToText } from "@/utils/helpers";
import { handleStop, readAloud, readSpanish } from "@/utils/speak";
import KeyBoard from "../word/KeyBoard";

const Message = ({
  content,
  translation,
  containerStyle,
  mainStyle,
}: {
  content: string;
  translation: string;
  containerStyle?: string;
  mainStyle?: string;
}) => {
  //   const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeakingSpanish, setIsSpeakingSpanish] = useState(false);

  const handleSpeakSpanish = () => {
    const text = parseMarkdownToText(content);

    if (isSpeakingSpanish) {
      readSpanish(text, setIsSpeakingSpanish);
      //   handleStop(setIsSpeakingSpanish);
    } else {
      readSpanish(text, setIsSpeakingSpanish);
      //   readAloud(text, setIsSpeakingSpanish);
    }
  };

  useEffect(() => {
    // translate();
  }, []);

  return (
    <div className={clsx("w-full flex", containerStyle)}>
      <div
        className={clsx(
          "min-w-[200px] max-w-[300px] md:max-w-[450px] text-white  rounded overflow-hidden",
          mainStyle
        )}
      >
        <section className="flex gap-2 px-2">
          <p className="py-2">{content}</p>
          <button onClick={handleSpeakSpanish} className="text-2xl">
            {isSpeakingSpanish ? <FaStopCircle /> : <FaPlayCircle />}
          </button>
        </section>

        <section className="bg-orange-600 px-2">
          <p className="italic text-xs">{translation}</p>
        </section>
      </div>
    </div>
  );
};

export default Message;
