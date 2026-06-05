import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "./config.js";

const apiKey = config.gemini.apiKey;

if (!apiKey) {
  console.warn("[GEMINI WARNING] GEMINI_API_KEY is not set — AI generation will fail");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const generateContent = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error('Gemini returned an empty response');
    }

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw new Error(`Gemini API failed: ${error.message}`);
  }
};

export { generateContent };