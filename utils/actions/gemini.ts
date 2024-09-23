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

export const generateEnglishSentence = async (words: string) => {
  // console.log("word list", words);

  const model = geminiAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `Use only words from this list: ${words} to generate the response the sentence`,
  });

  try {
    const result = await model.generateContent(
      "Generate a random English sentence"
    );
    return {
      success: true,
      message: "English sentence generated successfully",
      data: result.response.text(),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Error generating sentence",
      data: null,
    };
  }
};

export const gradeTranslation = async (
  sentence: string,
  translation: string
) => {
  const model = geminiAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `Compare the English sentence and the Spanish translation and grade, on a scale of 100, how close the translation is to the correct Spanish translation. Give feed back on areas where adjustment is needed and provide the correct translation. Your response should in JSON object with the following schema:

    grade: The grade of the translation
    feedback: As a markdown string, give the feedback you gave for the translation with breakdown of each words and their use.
    translation: The corrected translation
    `,
  });

  try {
    const result = await model.generateContent(`
      English sentence: ${sentence}
      Spanish translation: ${translation}
      `);
    return {
      success: true,
      message: "Sentence graded successfully",
      data: result.response.text(),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Error grading sentence",
      data: null,
    };
  }
};

export const generateStreamResponse = async (prompt: string) => {
  const model = geminiAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `Use only `,
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
