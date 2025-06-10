'use client';

import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState, use } from 'react';
import { getRecipeByIdAndUser } from '../../actions/actions';
import RecipeBasicInfo from './_components/RecipeBasicInfo';
import RecipeDetail from './_components/RecipeDetail';
import Ingredients from './_components/Ingredients';
import { Button } from '../../../components/ui/button';

function RecipeLayout(rawParams) {
  const { user } = useUser();
  const [recipe, setRecipe] = useState(null);

  const resolvedParams = use(rawParams.params); 
  const { recipeId } = resolvedParams || {}; 

  const fetchRecipe = async () => {
    if (user && recipeId) { 
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      const result = await getRecipeByIdAndUser(recipeId, userEmail);
      console.log('Fetched recipe:', result); 
      setRecipe(result);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [user, recipeId]);

const GenerateRecipe = () => {
  if (recipe && recipe.recipeOutput && recipe.recipeOutput.steps) {
    console.log('Recipe Steps:', recipe.recipeOutput.steps);
    // If you want to display them on screen, you can also set state and render
  } else {
    console.log('No steps available in recipe.');
  }
};

  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h1 className='font-bold text-center text-3xl'>Recipe Layout</h1>
      <RecipeBasicInfo recipe={recipe} refreshData={fetchRecipe} />
      <RecipeDetail recipe={recipe} />
      <Ingredients recipe={recipe} />
      <Button onClick={GenerateRecipe} style={{ color: '#36454F' }} className="my-10">Generate Recipe</Button>
    </div>
  );
}

export default RecipeLayout;


