import { GoogleGenerativeAI} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateRecipeLayout_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text:
            "Generate a Recipe on Following Details with field as Recipe Name, Ingredients,Duration, Recipe Type, Cuisine Category,Recipe in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `\`\`\`json
{
  "recipe name": "Spaghetti Carbonara",
  "ingredients": [
    "200g spaghetti",
    "100g pancetta",
    "2 large eggs",
    "50g parmesan cheese",
    "2 cloves garlic",
    "Salt and black pepper to taste"
  ],
  "duration": "25 minutes",
  "recipe type": "Main Course",
  "cuisine category": "Italian",
  "recipe": "Boil pasta. Cook pancetta with garlic. Beat eggs with cheese. Combine all off heat to avoid scrambling eggs."
}
\`\`\``
        }
      ]
    },
  ],
});
