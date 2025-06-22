'use client';

import React, { useEffect, useState } from 'react';
import { getRecipeById } from '../../actions/getRecipeById';
import Header from '../../_components/Header';
import RecipeBasicInfo from '../../create-recipe/[recipeId]/_components/RecipeBasicInfo';
import RecipeDetail from '../../create-recipe/[recipeId]/_components/RecipeDetail';
import Ingredients from '../../create-recipe/[recipeId]/_components/Ingredients';

function Recipe({ params }) {
  const unwrappedParams = React.use(params);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Current unwrappedParams:", unwrappedParams); // Log the resolved params
    console.log("Current recipeId:", unwrappedParams?.recipeId); // Log the recipeId

    if (unwrappedParams?.recipeId) {
      getRecipeById(unwrappedParams.recipeId)
        .then((data) => {
          console.log("Data received from getRecipeById:", data); // Log the fetched data
          setRecipe(data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Failed to fetch recipe:", error); // Log any errors
          setRecipe(null);
          setLoading(false);
        });
    } else {
      console.log("No recipeId found in params, setting recipe to null.");
      setLoading(false);
      setRecipe(null);
    }
  }, [unwrappedParams]);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">Loading recipe...</div>
    );
  }

  if (!recipe) {
    return (
      <div className="p-10 text-center text-red-500">
        Recipe not found or failed to load.
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="px-10 p-10 md:px-20 lg:px-44">
        <RecipeBasicInfo recipe={recipe} edit={false} />
        <RecipeDetail recipe={recipe} />
        <Ingredients recipe={recipe} edit={false} />
      </div>
    </div>
  );
}

export default Recipe;