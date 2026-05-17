import { generateContent } from '../config/gemini.config.js';

export const askGemini = async (prompt) => {
  try {
    if (!prompt) {
      throw new Error('Prompt is required');
    }

    const response = await generateContent(prompt);

    if (!response) {
      throw new Error('Gemini returned an empty response');
    }

    return response;
  } catch (error) {
    console.error('Gemini Service Error:', error);
    throw error; // Pass the actual error up instead of generic message
  }
};