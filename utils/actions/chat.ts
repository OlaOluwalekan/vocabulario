"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";

export const createChat = async (formData: FormData) => {
  const title = formData.get("title");
  const context = formData.get("context");

  if (!title) {
    return { success: false, message: "Please provide a title", data: null };
  }
  if (!context) {
    return {
      success: false,
      message: "Please provide a context for the chat",
      data: null,
    };
  }

  try {
    const chat = await db.chat.create({
      data: {
        title: title as string,
        context: context as string,
      },
    });
    revalidatePath("/chat");

    return {
      success: true,
      message: "chat created successfully",
      data: chat,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
};

export const getChats = async () => {
  try {
    const chats = await db.chat.findMany({});

    return {
      success: true,
      message: "Chats fetched successfully",
      data: chats,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
};
