// actions.js
'use server';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import { RecipeList } from './configs/schema';
import uuid4 from 'uuid4';

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
  userProfileImage
) {
  try {
    console.log('--- Incoming Data for saveRecipeToDatabase ---');
    console.log('recipeLayout:', recipeLayout);
    console.log('cuisineType:', cuisineType);
    console.log('cuisineCategory:', cuisineCategory);
    console.log('duration:', duration);
    console.log('userEmail:', userEmail);
    console.log('userName:', userName);
    console.log('userProfileImage:', userProfileImage);
    console.log('-------------------------------------------');

    if (!recipeLayout || typeof recipeLayout !== 'object' || Object.keys(recipeLayout).length === 0) {
      console.error('Validation Error: recipeLayout is missing or invalid.');
      return { success: false, message: 'Invalid recipe layout data provided.' };
    }
    if (!recipeLayout.recipeName) {
      console.error('Validation Error: recipeName is missing from recipeLayout.');
      return { success: false, message: 'Recipe name is required.' };
    }
    if (!cuisineType || typeof cuisineType !== 'string' || cuisineType.trim() === '') {
      console.error('Validation Error: Cuisine type is missing or invalid.');
      return { success: false, message: 'Cuisine type is required.' };
    }
    if (!cuisineCategory || typeof cuisineCategory !== 'string' || cuisineCategory.trim() === '') {
      console.error('Validation Error: Cuisine category is missing or invalid.');
      return { success: false, message: 'Cuisine category is required.' };
    }
    if (!duration || typeof duration !== 'string' || duration.trim() === '') {
      console.error('Validation Error: Duration is missing or invalid.');
      return { success: false, message: 'Preparation duration is required.' };
    }

    // It's still good practice to provide fallbacks for Clerk user data here
    // as you've done, even if the DB now accepts NULLs.
    // If you always want to send a string, ensure your client-side passes a fallback.
    const finalUserEmail = userEmail || null; // Or 'anonymous@example.com' if your DB allows it
    const finalUserName = userName || null;
    const finalUserProfileImage = userProfileImage || null;

    // Optional: If you strictly require userEmail to be present in actions.js
    // if (!finalUserEmail) {
    //   console.error('Validation Error: User email is required for recipe saving.');
    //   return { success: false, message: 'User must be logged in to save recipes.' };
    // }

    const id = uuid4();
    const ingredientsToSave = Array.isArray(recipeLayout.ingredients) ? recipeLayout.ingredients : [];

    // Ensure db is properly initialized
    if (!db || typeof db.insert !== 'function') {
      console.error('Database connection (db) is not properly initialized or insert method is missing.');
      return { success: false, message: 'Database connection error.' };
    }

    const result = await db.insert(RecipeList).values({
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

    console.log("Recipe saved successfully:", result); // Keep this log for server-side verification

    // --- CRUCIAL CHANGE HERE: Return only serializable data ---
    return {
      success: true,
      message: "Recipe saved successfully!",
      // You can return a simple ID or other plain data if needed
      // For example, if you fetch the recipe after insert: data: { recipeId: id }
      // For now, let's just confirm success without returning the complex DB result object.
      // If you need more specific data, fetch it separately or select only necessary fields.
      // Example: data: { recipeId: id, name: recipeLayout.recipeName }
      data: { recipeId: id } // Return just the ID, or an empty object if no data is strictly needed
    };
  } catch (error) {
    console.error("Error saving recipe to database:", error);
    if (error.cause?.code === '23502') { // Check if it's a NOT NULL constraint violation
      console.error(`DB Constraint Violation on column: ${error.cause.column}`);
      return { success: false, message: `Failed to save recipe: Missing required data for column '${error.cause.column}'.`, error: error.message };
    }
    return { success: false, message: "Failed to save recipe due to unexpected error.", error: error.message };
  }
}