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
import { saveVideoDataToDB } from '../../actions/actions';

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

      // Save only to Recipe table
      const result = await saveVideoDataToDB(
        recipe.recipeId,
        recipe.recipeOutput,
        videoId
      );

      if (result.success) {
        router.replace(`/create-recipe/${recipe.recipeId}/finish`);
      } else {
        console.error("Failed to save video data:", result.error);
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
      <RecipeBasicInfo
  recipe={recipe}
  refreshData={fetchRecipe}
  generateRecipe={GenerateRecipe} 
/>
      <RecipeDetail recipe={recipe} />
      <Ingredients recipe={recipe} />
      <Button onClick={GenerateRecipe} style={{ backgroundColor: '#FF7B74' }} className="my-10">Generate Recipe</Button>
    </div>
  );
}

export default RecipeLayout;


