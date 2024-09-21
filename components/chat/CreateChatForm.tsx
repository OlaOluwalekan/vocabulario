"use client";

import { chatContextSelectData } from "@/data/chat";
import { setChatPopupIsOpen } from "@/features/chatSlice";
import { createChat } from "@/utils/actions/chat";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { v4 as uniqueId } from "uuid";

const CreateChatForm = () => {
  const [isCustomInput, setIsCustomInput] = useState<boolean>(false);
  const [customInputValue, setCustomInputValue] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    context: "",
  });
  const [selectData, setSelectData] = useState(chatContextSelectData);
  const dispatch = useDispatch();
  const [creatingChat, startCreatingChat] = useTransition();
  const router = useRouter();

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "custom") {
      setIsCustomInput(true);
    } else {
      setFormData({ ...formData, context: value });
      setIsCustomInput(false);
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomInputValue(e.target.value);
  };

  const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCustomInputSubmit = () => {
    if (customInputValue.trim()) {
      setFormData({ ...formData, context: customInputValue });
      setSelectData([
        ...selectData,
        { id: uniqueId(), context: customInputValue },
      ]);
      setIsCustomInput(false); // Hide the input box after submission
    }
  };

  const handleSelectCanceled = () => {
    if (customInputValue.trim()) {
      setFormData({ ...formData, context: "" });
      setIsCustomInput(false); // Hide the input box after submission
    }
  };

  const handleSubmit = (formData: FormData) => {
    // console.log(formData);
    startCreatingChat(() => {
      createChat(formData).then((res) => {
        if (res.success) {
          console.log(res.data);
          toast.success(res.message);
          dispatch(setChatPopupIsOpen(false));
          router.push(`/chat/${res.data?.id}`); // Redirect to the chat page
        } else {
          toast.error(res.message);
        }
      });
    });
  };

  return (
    <div
      className="w-screen h-screen fixed bg-black/50 top-0 left-0 backdrop-blur-sm backdrop-filter flex justify-center items-center"
      onClick={() => dispatch(setChatPopupIsOpen(false))}
    >
      <form
        className="bg-white w-[90%] max-w-[600px] px-2 py-4 shadow-lg flex flex-col items-center"
        action={handleSubmit}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        {/* chat title */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Chat Title</span>
          </div>
          <input
            type="text"
            name="title"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={handleFormDataChange}
          />
        </label>

        {/* select chat context */}
        <label className="form-control w-full">
          {!isCustomInput ? (
            <div className="label">
              <span className="label-text">Chat Context</span>
            </div>
          ) : null}

          {!isCustomInput ? (
            <select
              className="select select-bordered"
              onChange={handleSelectChange}
              value={formData.context ?? ""}
              name="context"
            >
              <option disabled value="">
                Pick one
              </option>
              {selectData.map((data) => {
                return (
                  <option key={data.id} value={data.context}>
                    {data.context}
                  </option>
                );
              })}
              <option value="custom">Type here...</option>
            </select>
          ) : (
            <div className="flex border-[1px] rounded-lg border-gray-300 my-2 pr-3">
              <input
                type="text"
                placeholder="Type here"
                className="input w-full focus:border-none focus:outline-none"
                onChange={handleCustomInputChange}
              />
              <article className="flex gap-2 text-xs">
                <button
                  type="button"
                  className="text-green-600"
                  onClick={handleCustomInputSubmit}
                >
                  Add
                </button>
                <button
                  className="text-red-600"
                  type="button"
                  onClick={handleSelectCanceled}
                >
                  Cancel
                </button>
              </article>
            </div>
          )}
        </label>

        <button
          className={clsx(
            "btn btn-primary btn-wide my-3",
            creatingChat
              ? "cursor-not-allowed opacity-50 bg-gray-700"
              : "cursor-pointer opacity-100"
          )}
          type="submit"
          disabled={creatingChat}
        >
          {creatingChat ? "Please wait..." : "Create Chat"}
        </button>
      </form>
    </div>
  );
};

export default CreateChatForm;
