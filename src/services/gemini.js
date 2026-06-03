import { GoogleGenAI } from '@google/genai';

const keys = [
  import.meta.env.VITE_GEMINI_KEY_1,
  import.meta.env.VITE_GEMINI_KEY_2,
  import.meta.env.VITE_GEMINI_KEY_3,
].filter(Boolean);

let currentKeyIndex = 0;

const createClient = (key) =>
  new GoogleGenAI({
    apiKey: key,
  });

export const askGemini = async (prompt) => {
  if (!keys.length) return 'Ai not available at the moment.';

  for (let i = 0; i < keys.length; i++) {
    const key = keys[currentKeyIndex % keys.length];
    const ai = createClient(key);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text || 'No response';
    } catch (err) {
      console.error(`Key failed (${currentKeyIndex}):`, err);

      // rotate key
      currentKeyIndex++;

      // small delay to avoid spam retries
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  return 'Error generating response. Try again later.';
};
