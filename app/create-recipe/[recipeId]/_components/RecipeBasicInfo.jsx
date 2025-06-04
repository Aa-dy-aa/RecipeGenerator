import React from 'react'

function RecipeBasicInfo({recipe}) {
  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>
                <h2 className='font-bold text-2xl'>{recipe?.recipeOutput?.recipeName}</h2>
                <p className='text-xs text-gray-400 mt-3'>{recipe?.recipeOutput?.steps}</p>
            </div>
            <div></div>
        </div>
    </div>
  )
}

export default RecipeBasicInfo