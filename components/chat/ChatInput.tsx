"use client";

import { createMessage } from "@/utils/actions/message";
import clsx from "clsx";
import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { FaMicrophone } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

const TEXT_BOX_HEIGHT = 48;

const ChatInput = ({
  context,
  words,
  modelName,
  description,
  chatId,
  history,
}: {
  context: string;
  words: string;
  modelName: string;
  description: string;
  chatId: string;
  history: any[];
}) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [sendingResponse, startSendingResponse] = useTransition();

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = `${TEXT_BOX_HEIGHT}px`;
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (textRef.current) {
      textRef.current.style.height = `${TEXT_BOX_HEIGHT}px`;
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
      if (textRef.current.scrollHeight > TEXT_BOX_HEIGHT) {
        textRef.current.style.lineHeight = "20px";
      }

      // let numHeight = parseInt(textRef.current.style.height);
      // dispatch(
      //   setChatInputHeight(
      //     numHeight < 184 ? textRef.current.style.height : "195px"
      //   )
      // );
    }
  };

  const handleSubmit = () => {
    startSendingResponse(() => {
      createMessage(
        chatId,
        text,
        context,
        words,
        modelName,
        description,
        history
      ).then((res) => {
        if (res.success) {
          if (textRef.current) {
            textRef.current.value = "";
            textRef.current.style.height = `${TEXT_BOX_HEIGHT}px`;
          }
          // toast.success(res.message)
          console.log(res.data);
        } else {
          toast.error(res.message);
        }
      });
    });
  };

  return (
    <form
      className="w-[90%] max-w-[1200px] border-2 flex gap-2 items-center absolute left-0 right-0 bottom-1 mx-auto px-2 rounded border-primary bg-base-100"
      action={handleSubmit}
    >
      <button className="text-lg">
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
      <button
        className={clsx(
          "text-lg text-primary",
          sendingResponse
            ? "opacity-70 cursor-not-allowed"
            : "opacity-100 cursor-pointer"
        )}
        type="submit"
        disabled={sendingResponse}
      >
        {sendingResponse ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <IoSend />
        )}
      </button>
    </form>
  );
};

export default ChatInput;
