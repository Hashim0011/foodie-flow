import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateRecipeMetadata = async (description: string): Promise<any> => {
  if (!apiKey) {
    console.warn("API Key is missing. AI features will not work.");
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a structured recipe based on this description: "${description}". If the description is vague, invent a delicious dish. Provide title, time (e.g. 30 Mins), servings (e.g. 02 Servings), calories (e.g. 500 Cal), difficulty (Easy/Medium/Hard), and a cleaned up description.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            time: { type: Type.STRING },
            servings: { type: Type.STRING },
            calories: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            description: { type: Type.STRING },
          },
          required: ["title", "time", "servings", "calories", "difficulty", "description"],
        },
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return null;
  } catch (error) {
    console.error("Error generating recipe metadata:", error);
    return null;
  }
};