"use client";

import {
  setText,
  setTranslation,
  setTranslationResult,
} from "@/features/translateSlice";
import { RootState } from "@/store";
import { gradeTranslation } from "@/utils/actions/gemini";
import clsx from "clsx";
import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react";
import { FaMicrophone } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import KeyBoard from "../word/KeyBoard";
import useLocalStorage from "@/utils/local-storage";
import toast from "react-hot-toast";

const TEXT_BOX_HEIGHT = 48;

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
  onend: () => void;
}

const TranslateForm = () => {
  const { sentence, text } = useSelector((store: RootState) => store.translate);
  //   const [text, setText] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [pending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const { addToLocalStorage } = useLocalStorage();
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  const handleMicClick = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        recognitionRef.current.start();
        setIsListening(true);
      }
    } else {
      toast.error("Speech recognition not supported");
    }
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = `${TEXT_BOX_HEIGHT}px`;
    }

    // speech recognition
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition() as ISpeechRecognition;
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "es-ES";

      recognitionRef.current.onresult = (event: any) => {
        // console.log(event.results[0][0].transcript);

        dispatch(setText(event.results[0][0].transcript));
      };

      recognitionRef.current.onerror = (event: any) => {
        console.log("speech recognition error: ", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setText(e.target.value));
    if (textRef.current) {
      textRef.current.style.height = `${TEXT_BOX_HEIGHT}px`;
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
      if (textRef.current.scrollHeight > TEXT_BOX_HEIGHT) {
        textRef.current.style.lineHeight = "20px";
      }
    }
  };

  const handleSubmit = () => {
    startTransition(() => {
      gradeTranslation(sentence, text).then((res) => {
        if (res.success) {
          dispatch(setTranslation(text));
          dispatch(setTranslationResult(res.data));
          addToLocalStorage("translation", text);
          addToLocalStorage("translationResult", res.data as string);
        }
      });
    });
  };

  return (
    <div>
      {sentence && (
        <div>
          <p className="font-semibold">
            Translate the sentence{" "}
            <span className="text-primary italic">"{sentence}"</span> to Spanish
          </p>

          <KeyBoard
            styleClass="w-fit mx-auto flex-row px-2 mt-2"
            keyStyle="w-[40px] mx-1"
          />

          <form action={handleSubmit} className="flex flex-col gap-2">
            <div className="w-full flex justify-between border-2 gap-2 px-2 rounded-md mt-5">
              <button
                className={clsx(
                  "text-lg",
                  isListening ? "text-red-600" : "text-black"
                )}
                onClick={handleMicClick}
                type="button"
              >
                <FaMicrophone />
              </button>

              <textarea
                name="text"
                id="text"
                defaultValue={text}
                onChange={handleChange}
                rows={1}
                ref={textRef}
                placeholder="Type here..."
                className="w-full resize-none max-h-[200px] overflow-y-auto text-base py-3 bg-base-100 focus:border-none focus:outline-none"
                style={{
                  height: `${TEXT_BOX_HEIGHT}px`,
                }}
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className={clsx(
                  "w-40 bg-primary text-primary-content py-2 rounded",
                  pending
                    ? "cursor-not-allowed opacity-70"
                    : "cursor-pointer opacity-100"
                )}
              >
                {pending ? "Grading..." : "Check"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TranslateForm;
