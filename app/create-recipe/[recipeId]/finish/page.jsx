'use client'; 

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { getRecipeByIdAndUser } from '../../../actions/actions'; 
import { useSearchParams } from 'next/navigation'; // Import useSearchParams

export default function FinishScreen() { 
  // 1. Get search parameters from the URL
  const searchParams = useSearchParams(); 
  // 2. Extract the 'recipeId' query parameter
  const recipeId = searchParams.get('recipeId'); 

  const { user, isLoaded } = useUser();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // This log will now show the recipeId from the URL query
    console.log("Checking inputs — recipeId (from URL query):", recipeId, "user:", user, "isLoaded:", isLoaded);

    const fetchRecipe = async () => {
      // The fetch will now proceed if recipeId is present in the URL query
      if (isLoaded && user && recipeId) { 
        const userEmail = user?.primaryEmailAddress?.emailAddress;
        
        if (userEmail) {
          try {
            const result = await getRecipeByIdAndUser(recipeId, userEmail);
            console.log("Fetched recipe:", result);
            setRecipe(result);
          } catch (error) {
            console.error("Error fetching recipe:", error);
          }
        } else {
          console.log("User email not available yet, or primary email address is missing.");
        }
      } else {
        console.log("Skipping fetch: user not loaded or recipeId missing.", { isLoaded, user, recipeId });
      }
    };

    fetchRecipe();
  }, [user, recipeId, isLoaded]); // Dependencies remain correct

  console.log("Render → user:", user);
  console.log("Render → recipe:", recipe);

  const steps = recipe?.recipeOutput?.steps;

  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      {steps && steps.length > 0 ? (
        <ol className="list-decimal pl-4 space-y-2">
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      ) : recipe ? (
        <p>No steps found in the recipe.</p>
      ) : (
        <p>Loading recipe...</p>
      )}
    </div>
  );
}