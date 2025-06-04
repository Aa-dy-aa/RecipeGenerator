'use client';

import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState, use } from 'react'; // Keep 'use' here
import { getRecipeByIdAndUser } from '../../actions/actions';
import RecipeBasicInfo from './_components/RecipeBasicInfo';

function RecipeLayout(rawParams) {
  const { user } = useUser();
  const [recipe, setRecipe] = useState(null);

  // --- FIX STARTS HERE ---
  // Use React.use() to unwrap the params Promise
  const resolvedParams = use(rawParams.params); // This line is the key change
  const { recipeId } = resolvedParams || {}; // Access recipeId from the unwrapped object
  // --- FIX ENDS HERE ---

  useEffect(() => {
    const fetchRecipe = async () => {
      if (user && recipeId) { // recipeId will now be correctly available
        const userEmail = user?.primaryEmailAddress?.emailAddress;
        const result = await getRecipeByIdAndUser(recipeId, userEmail);
        console.log('Fetched recipe:', result); 
        setRecipe(result);
      }
    };

    fetchRecipe();
  }, [user, recipeId]);

  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2 className='font-bold text-center text-2xl'>Recipe Layout</h2>
      <RecipeBasicInfo recipe={recipe}/>
      {/* {recipe ? (
        <pre>{JSON.stringify(recipe, null, 2)}</pre>
      ) : (
        <p>Loading or not found.</p>
      )} */}
    </div>
  );
}

export default RecipeLayout;

