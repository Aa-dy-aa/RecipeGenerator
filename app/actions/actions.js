'use server';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { and, eq } from 'drizzle-orm';
import uuid4 from 'uuid4';
import { RecipeList } from '../../configs/schema';
import { Recipes } from '../../configs/schema';
import { GenerateRecipeLayout_AI } from '../../configs/AiModel';  // You already used it in page.jsx

console.log('DATABASE_URL in actions.js (for direct init):', process.env.DATABASE_URL);
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);
export async function saveRecipeToDatabase(
  recipeLayout,
  cuisineType,
  cuisineCategory,
  duration,
  userEmail,
  userName,
  userProfileImage,
  info,
  serves,
  caloriesPerServing,
  description
) {

  const finalUserEmail = userEmail || null;
  const finalUserName = userName || null;
  const finalUserProfileImage = userProfileImage || null;

  const id = uuid4();
  const ingredientsToSave = Array.isArray(recipeLayout.ingredients) ? recipeLayout.ingredients : [];

  if (!db || typeof db.insert !== 'function') {
    console.error('Database connection (db) is not properly initialized or insert method is missing.');
    return { success: false, message: 'Database connection error.' };
  }

  await db.insert(RecipeList).values({
    recipeId: id,
    name: recipeLayout.recipeName,
    cuisine: cuisineType,
    category: cuisineCategory,
    ingredients: ingredientsToSave,
    duration: duration,
    recipeOutput: recipeLayout,
    createdBy: finalUserEmail,
    userName: finalUserName,
    userProfileImage: finalUserProfileImage,
    info:info,
    serves:serves || 1,
    caloriesPerServing:caloriesPerServing || 0,
    description:description
  });

  console.log("Recipe saved successfully with ID:", id);

  return {
    success: true,
    message: "Recipe saved successfully!",
    data: { recipeId: id }
  };
}
export async function getRecipeByIdAndUser(recipeId, userEmail) {
  console.log('Attempting to fetch recipe for:', { recipeId, userEmail });

  if (!recipeId || !userEmail) {
    console.error('getRecipeByIdAndUser: Missing required parameters (recipeId or userEmail).');
    return null;
  }

  const result = await db.select()
    .from(RecipeList)
    .where(and(
      eq(RecipeList.recipeId, recipeId),
      eq(RecipeList.createdBy, userEmail)
    ));

  return result?.[0] || null;
}
export async function updateRecipeInDatabase(recipeId, updatedRecipeOutput, updatedCategory, updatedDescription) {
  console.log('Updating recipe:', recipeId);

  const result = await db.update(RecipeList)
    .set({
      recipeOutput: updatedRecipeOutput,
      category: updatedCategory,
      description: updatedDescription
    })
    .where(eq(RecipeList.recipeId, recipeId))
    .returning({ id: RecipeList.id });

  return result;
}
export async function generateRecipeOutput(cuisine) {
  console.log("Calling AI to generate recipe for cuisine:", cuisine);

  const USER_INPUT_PROMPT = `
Generate a detailed recipe using the following constraints:
- Cuisine Type (e.g. Indian, Italian, Mexican): "${cuisine}"

Output the result strictly as a JSON object with the following fields:
{
  "recipeName": string,
  "cuisine": string,
  "cuisineCategory": string,
  "info": string,
  "serves": number,
  "caloriesPerServing": number,
  "description": string,
  "ingredients": [
    {
      "name": string,
      "quantity": string,
      "unit": string
    }
  ],
  "totalDuration": string,
  "steps": [
    "Step 1 instruction...",
    "Step 2 instruction...",
    ...
  ]
}

Info would include a basic introduction of the recipe in about 50-60 words.
Ensure the recipe is an authentic ${cuisine} dish. Do not include any introductory text or notes. Only output the JSON object.
`;

  try {
    // Use your same AI model here:
    const result = await GenerateRecipeLayout_AI.sendMessage(USER_INPUT_PROMPT);

    const responseText = result.response?.text();
    console.log("Raw AI Response:", responseText);

    const recipeLayout = JSON.parse(responseText);
    return recipeLayout;
    
  } catch (error) {
    console.error("Error generating recipe output:", error);
    throw error;
  }
}

export async function saveVideoDataToDB(recipeId, content, videoId) {
  try {
    await db.insert(Recipes).values({
      recipeId: recipeId,
      content: content,
      videoId: videoId,
    });

    console.log("Video data saved successfully!");
    return { success: true };
  } catch (err) {
    console.error("Error saving video data:", err);
    return { success: false, error: err.message };
  }
}