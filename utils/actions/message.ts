"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import { generateResponse } from "./gemini";
import axios from "axios";

const translate = async (content: string) => {
  const options = {
    method: "POST",
    url: "https://ai-translate.p.rapidapi.com/translate",
    headers: {
      "x-rapidapi-key": "b3c7b71d15msh4966d113aace904p1ca73bjsn8d3ee2075fef",
      "x-rapidapi-host": "ai-translate.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      texts: [content],
      tl: "en",
      sl: "es",
    },
  };
  try {
    const { data } = await axios.request(options);
    //   console.log(data);

    return data.texts;
  } catch (error) {
    console.log("Translation Error: ", error);
    return "";
  }
};

export const createMessage = async (
  chatId: string,
  content: string,
  context: string,
  words: string,
  modelName: string,
  description: string,
  history: any[]
) => {
  let response: string;

  let formattedHistory: any[] = [];

  history.forEach((his) => {
    let first = {
      role: "user",
      parts: [{ text: his.content }],
    };
    let second = {
      role: "model",
      parts: [{ text: his.response }],
    };

    formattedHistory.push(first, second);
  });

  try {
    const aiResponse = await generateResponse(
      content,
      context,
      words,
      modelName,
      description,
      formattedHistory
    );
    if (aiResponse.success) {
      response = aiResponse.data as string;
    } else {
      return { success: false, message: aiResponse.message, data: null };
    }

    const contentTranslation = await translate(content);
    const responseTranslation = await translate(response);

    const newMessage = await db.message.create({
      data: {
        chatId,
        content,
        response,
        contentTranslation,
        responseTranslation,
      },
    });

    revalidatePath(`/chat/${chatId}`);
    return {
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Error sending message",
      data: null,
    };
  }
};

export const getMessages = async (chatId: string) => {
  try {
    const messages = await db.message.findMany({
      where: {
        chatId,
      },
      // orderBy: {
      //     createdAt: 'asc'
      // }
    });

    return {
      success: true,
      message: "messages fetched successfully",
      data: messages,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Error fetching message",
      data: null,
    };
  }
};
