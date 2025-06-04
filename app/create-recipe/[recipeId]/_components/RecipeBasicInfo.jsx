import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react';

function RecipeBasicInfo({recipe}) {
  const [animationData, setAnimationData] = useState(null);
   useEffect(() => {
    fetch('/placeholder.json') // ✅ correct public path
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);
  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>
                <h2 className='font-bold text-2xl'>{recipe?.recipeOutput?.recipeName}</h2>
                <p className='text-xs text-gray-400 mt-3'>{recipe?.recipeOutput?.steps}</p>
            </div>
            <div>
               {animationData && (
            <Lottie animationData={animationData} loop autoplay className='w-full rounded-xl' />
          )}
            </div>
        </div>
    </div>
  )
}

export default RecipeBasicInfo