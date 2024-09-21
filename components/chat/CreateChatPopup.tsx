"use client";

import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import CreateChatForm from "./CreateChatForm";
import { setChatPopupIsOpen } from "@/features/chatSlice";
import clsx from "clsx";
import { FaPlus } from "react-icons/fa6";

const CreateChatPopup = ({ chatLength }: { chatLength: number }) => {
  const { chatPopIsOpen } = useSelector((store: RootState) => store.chat);
  const dispatch = useDispatch();

  return (
    <div>
      <button
        className={clsx(
          "btn btn-primary",
          chatLength == 0 ? "" : "fixed bottom-3 right-4"
        )}
        onClick={() => dispatch(setChatPopupIsOpen(true))}
      >
        {chatLength == 0 ? "Create Chat" : <FaPlus className="text-lg" />}
      </button>

      {chatPopIsOpen && <CreateChatForm />}
    </div>
  );
};

export default CreateChatPopup;
