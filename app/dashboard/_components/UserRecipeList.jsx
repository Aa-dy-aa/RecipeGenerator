'use client';

import React, { useEffect, useState } from 'react';
import RecipeCard from '../_components/RecipeCard';
import { getUserSavedRecipes } from '../../actions/getUserRecipes';

function UserRecipeList() {
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getUserSavedRecipes();
      setRecipeList(recipes);
    };
    fetchRecipes();
  }, []);

  return (
    <div className='mt-10'>
      <h2 className='font-medium text-xl'>My AI Recipes</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {recipeList.map((recipe, index) => (
          <RecipeCard recipe={recipe} key={index} />
        ))}
      </div>
    </div>
  );
}

export default UserRecipeList;
