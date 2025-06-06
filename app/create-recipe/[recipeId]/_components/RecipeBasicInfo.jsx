import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react';
import { HiOutlinePuzzle } from "react-icons/hi";
import { Button } from '../../../../components/ui/button';
import EditRecipeBasicInfo from './EditRecipeBasicInfo'; 

function RecipeBasicInfo({recipe}) {
  const [animationData, setAnimationData] = useState(null);
   useEffect(() => {
    fetch('/placeholder.json') 
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);
  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
                <h2 style={{ color: '#FF7B74' }} className='font-bold text-2xl'>{recipe?.recipeOutput?.recipeName}<EditRecipeBasicInfo recipe={recipe}/></h2>
                <p className='text-xs text-gray-400 mt-3'>{recipe?.recipeOutput?.info}</p>
                <h2 style={{ color: '#FF7B74' }} className='font-medium mt-2 flex gap-2 items-center'><HiOutlinePuzzle />{recipe?.category}</h2>
                <Button style={{ backgroundColor: '#FF7B74' }} className='w-full mt-5'>Let's Cook!</Button>
            </div>
            <div>
               {animationData && (
            <Lottie animationData={animationData} loop autoplay className='w-full rounded-xl h-[250px] object-cover' />
          )}
            </div>
        </div>
    </div>
  )
}

export default RecipeBasicInfo