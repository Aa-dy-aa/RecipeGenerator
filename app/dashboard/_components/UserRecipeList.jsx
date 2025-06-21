'use client';

import React, { useEffect, useState, useContext } from 'react';
import RecipeCard from '../_components/RecipeCard';
import { getUserSavedRecipes } from '../../actions/getUserRecipes';
import { deleteRecipeById } from '../../actions/deleteRecipe';
import { UserRecipeListContext } from '../../_context/UserRecipeListContext'; 

function UserRecipeList() {
  const [recipeList, setRecipeList] = useState([]);
  const { userRecipeList, setUserRecipeList } = useContext(UserRecipeListContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getUserSavedRecipes();
      setRecipeList(recipes);
      setUserRecipeList(recipes);
    };
    fetchRecipes();
  }, []);

  const handleDelete = async (recipeId) => {
    try {
      await deleteRecipeById(recipeId);
      setRecipeList((prev) => prev.filter((r) => r.id !== recipeId));
      setUserRecipeList((prev) => prev.filter((r) => r.id !== recipeId));
    } catch (error) {
      console.error('Failed to delete recipe:', error);
    }
  };

  return (
    <div className='mt-10'>
      <h2 className='font-medium text-xl'>My AI Recipes</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {recipeList.map((recipe) => (
          <RecipeCard
            recipe={recipe}
            key={recipe.id}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default UserRecipeList;
