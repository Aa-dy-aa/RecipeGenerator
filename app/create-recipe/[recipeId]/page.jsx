'use client';

import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState, use } from 'react';
import { getRecipeByIdAndUser } from '../../actions/actions';
import RecipeBasicInfo from './_components/RecipeBasicInfo';
import RecipeDetail from './_components/RecipeDetail';
import Ingredients from './_components/Ingredients';
import { Button } from '../../../components/ui/button';
import service from '../../../configs/service'
import {useRouter} from 'next/navigation'
import { saveRecipeToDatabase } from '../../actions/actions';

function RecipeLayout(rawParams) {
  const { user } = useUser();
  const [recipe, setRecipe] = useState(null);
  const router=useRouter();

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

const GenerateRecipe = async () => {
  if (recipe?.recipeOutput?.steps?.length) {
    try {
      const videoResp = await service.getVideos(`${recipe?.name}: ${recipe.recipeOutput.steps.join(' ')}`);
      const videoId = videoResp[0]?.id?.videoId || '';

      const response = await saveRecipeToDatabase(
        recipe.recipeOutput,
        recipe.recipeOutput.cuisine,
        recipe.recipeOutput.cuisineCategory,
        recipe.recipeOutput.totalDuration,
        user?.primaryEmailAddress?.emailAddress,
        user?.fullName,
        user?.imageUrl,
        recipe.recipeOutput.info,
        recipe.recipeOutput.serves,
        recipe.recipeOutput.caloriesPerServing,
        recipe.recipeOutput.description,
        videoId 
      );
      if (response.success) {
        router.replace(`/create-recipe/${response.data.recipeId}/finish`);
      } else {
        console.error("Failed to save recipe:", response.message);
      }

    } catch (error) {
      console.error("Error in GenerateRecipe:", error);
    }

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


