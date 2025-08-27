import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: "The name of the high-protein recipe."
    },
    description: {
      type: Type.STRING,
      description: "A brief, enticing description of the dish, highlighting its high-protein and fitness-friendly nature."
    },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "An ingredient with its quantity, adjusted for the specified number of servings, e.g., '200g chicken breast'"
      }
    },
    instructions: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "A single step in the cooking instructions, focusing on lean preparation methods."
      }
    },
    estimatedCaloriesPerServing: {
      type: Type.NUMBER,
      description: "A numerical estimate of the total calories per serving, calculated by summing the calories from the calorieBreakdown."
    },
    calorieBreakdown: {
        type: Type.ARRAY,
        description: "A list of each ingredient and its corresponding calorie count for a single serving.",
        items: {
            type: Type.OBJECT,
            properties: {
                ingredient: {
                    type: Type.STRING,
                    description: "The name of the ingredient (e.g., '100g chicken breast')."
                },
                calories: {
                    type: Type.NUMBER,
                    description: "The estimated calories for that specific ingredient quantity."
                }
            },
            required: ["ingredient", "calories"]
        }
    }
  },
  required: ["recipeName", "description", "ingredients", "instructions", "estimatedCaloriesPerServing", "calorieBreakdown"],
};

export const generateRecipe = async (proteins: string, servings: number): Promise<Recipe> => {
  const systemInstruction = "You are an AI chef specializing in high-protein recipes for fitness goals. Your mission is to generate recipes that maximize protein content while minimizing fats and carbohydrates. Your recipe MUST strictly use ONLY the protein ingredients provided by the user as the main protein sources; do not introduce other primary protein sources (like other meats, fish, or legumes unless they were in the user's list). Prioritize lean cooking methods. You must also: 1. Scale ingredient quantities for the number of servings requested. 2. For each ingredient, accurately calculate its calorie contribution for a single serving. 3. Provide a detailed breakdown of these calories per ingredient. 4. Sum the breakdown to provide a total estimated calorie count per serving.";
  const userPrompt = `Create a high-protein recipe for ${servings} people using ONLY the following ingredients as the primary protein sources: ${proteins}.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        temperature: 0.7,
        topP: 0.9,
      }
    });

    const jsonText = response.text.trim();
    const recipeData = JSON.parse(jsonText);
    
    // Basic validation
    if (!recipeData.recipeName || !recipeData.ingredients || !recipeData.instructions || recipeData.estimatedCaloriesPerServing === undefined || !Array.isArray(recipeData.calorieBreakdown)) {
        throw new Error("Invalid recipe format received from API.");
    }

    return recipeData as Recipe;

  } catch (error) {
    console.error("Error generating recipe with Gemini API:", error);
    throw new Error("Failed to generate recipe from Gemini API.");
  }
};