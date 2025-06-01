// actions.js
'use server';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import { RecipeList } from './configs/schema';
import uuid4 from 'uuid4';

// Initialize the database client outside the function for efficiency
// This ensures it's initialized once per server instance/worker.
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

export async function saveRecipeToDatabase(
  recipeLayout,
  cuisineType,
  cuisineCategory,
  duration,
  userEmail,
  userName,
  userProfileImage
) {
  // Directly within the try block for cleaner flow
  try {
    // --- Data Validation ---
    // Basic checks for critical input data
    if (!recipeLayout || typeof recipeLayout !== 'object' || Object.keys(recipeLayout).length === 0) {
      return { success: false, message: 'Invalid recipe layout data provided.' };
    }
    if (!recipeLayout.recipeName) {
      return { success: false, message: 'Recipe name is required.' };
    }
    if (!cuisineType || typeof cuisineType !== 'string' || cuisineType.trim() === '') {
      return { success: false, message: 'Cuisine type is required.' };
    }
    if (!cuisineCategory || typeof cuisineCategory !== 'string' || cuisineCategory.trim() === '') {
      return { success: false, message: 'Cuisine category is required.' };
    }
    if (!duration || typeof duration !== 'string' || duration.trim() === '') {
      return { success: false, message: 'Preparation duration is required.' };
    }

    // --- Prepare Data for Database ---
    const finalUserEmail = userEmail || null;
    const finalUserName = userName || null;
    const finalUserProfileImage = userProfileImage || null;

    const id = uuid4();
    const ingredientsToSave = Array.isArray(recipeLayout.ingredients) ? recipeLayout.ingredients : [];

    // --- Database Insert Operation ---
    // Ensure db is properly initialized (though unlikely to be undefined here)
    if (!db || typeof db.insert !== 'function') {
      return { success: false, message: 'Database connection error: DB client not initialized.' };
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
      userProfileImage: finalUserProfileImage
    });

    // --- Success Response ---
    return {
      success: true,
      message: "Recipe saved successfully!",
      data: { recipeId: id }
    };
  } catch (error) {
    // --- Error Handling ---
    // Log the full error for server-side debugging (can be removed in production after stable)
    console.error("Error saving recipe to database:", error);

    // Provide specific message for common DB constraint violation
    if (error.cause?.code === '23502') {
      return { success: false, message: `Failed to save recipe: Missing required data for column '${error.cause.column}'.` };
    }
    // Generic error message for other unexpected errors
    return { success: false, message: "Failed to save recipe due to an unexpected error." };
  }
}