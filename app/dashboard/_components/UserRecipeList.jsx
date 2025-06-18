'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import RecipeCard from '../_components/RecipeCard';
import { getUserRecipes } from '../../actions/getUserRecipes';

function UserRecipeList() {
  const [recipeList, setRecipeList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchRecipes = async () => {
      if (user) {
        const email = user?.primaryEmailAddress?.emailAddress;
        const recipes = await getUserRecipes(email); 
        setRecipeList(recipes);
      }
    };

    fetchRecipes();
  }, [user]);

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
