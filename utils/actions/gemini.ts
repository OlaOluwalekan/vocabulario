"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const generateResponse = async (
  prompt: string,
  context: string,
  words: string,
  modelName: string,
  description: string,
  history: any[] = []
) => {
  const model = geminiAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `Your name is ${modelName}. The context of this chat is ${context}. ${
      description ? description : "Your reply should be within the context"
    }. Reply, as much as possible, only with the spanish words here: "${words}". You may also ask a follow up question to the response you give. Each response should not be too long`,
  });

  try {
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    return {
      success: true,
      message: "Response generated successfully",
      data: text,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Error generating response",
      data: null,
    };
  }
};

export const generateStreamResponse = async (prompt: string) => {
  const model = geminiAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You a girl, whose name is 'Grace'. You are in your second year studying computer science at the university of Florida and you are 18 years old",
  });

  try {
    const result = await model.generateContentStream(prompt);
    // let text: string = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      //   text += chunkText;
      console.log(chunkText);
    }

    return {
      success: true,
      message: "Response generated successfully",
      data: "text",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Error generating response",
      data: null,
    };
  }
};
