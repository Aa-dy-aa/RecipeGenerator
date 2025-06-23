'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { getRecipeByIdAndUser } from '../../../actions/actions';
import { useParams } from 'next/navigation'; 
import IngredientsList from '../../[recipeId]/_components/IngredientsList'
import YouTube from 'react-youtube'
const opts = {
      height: '390',
      width: '640',
      playerVars: {
      autoplay: 0,
      },
    };


export default function FinishScreen() {
  const params = useParams(); 
  const recipeId = params.recipeId; 

  const { user, isLoaded } = useUser();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    console.log("Checking inputs — recipeId:", recipeId, "user:", user, "isLoaded:", isLoaded);

    const fetchRecipe = async () => {
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
        }
      } else {
        console.log("Skipping fetch: user not loaded or recipeId missing.", { isLoaded, user, recipeId });
      }
    };

    fetchRecipe();
  }, [user, recipeId, isLoaded]);

  const steps = recipe?.recipeOutput?.steps;

return (
  <div className="flex min-h-screen">
    {/* Sidebar */}
    <div className='w-64 hidden md:block bg-pink-50 border-r shadow-sm'>
      <h2 style={{ backgroundColor: '#FF7B74' }} className='font-medium text-lg p-3 text-white'>{recipe?.recipeOutput?.recipeName}</h2>
      <div>
        {recipe?.recipeOutput?.ingredients?.map((ingredient, index) => (
          <div key={index}>
            <IngredientsList ingredient={ingredient} index={index} />
          </div>
        ))}
      </div>
    </div>
    
    {/* Main Content */}
    <div className="flex-1 px-5 md:px-20 lg:px-44 my-7">
      <div className='flex justify-center'>
        <YouTube videoId={recipe?.content?.videoId} opts={opts}></YouTube>
      </div>
      <div className='p-5 bg-pink-50 mb-3 rounded-lg'>
        {steps && steps.length > 0 ? (
        <ol className="list-decimal pl-4 space-y-2 font-medium text-lg">
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
    </div>
  </div>
);
}
