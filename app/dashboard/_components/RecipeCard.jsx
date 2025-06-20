import React from 'react';
import { HiEllipsisVertical, HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import DropdownOption from '../_components/DropdownOption';
import { getRecipeImageUrl } from '../../actions/getRecipeImage';

function RecipeCard({ recipe }) {
  const generatedFallbackBanner = getRecipeImageUrl(recipe?.content?.recipeName);
  const imageUrl = recipe?.recipeBanner || generatedFallbackBanner;
  const finalImageSrc = (imageUrl && imageUrl !== '') ? imageUrl : null;
  console.log("recipeBanner:", recipe?.recipeBanner);
console.log("finalImageSrc:", finalImageSrc);


  return (
    <div className='shadow-sm rounded-lg border p-2 cursor-pointer mt-4 hover:border-[#E45C55]'>
      {finalImageSrc ? (
        <img
          src={finalImageSrc}
          alt="Recipe Banner"
          width={300}
          height={200}
          className='w-full h-[200px] object-cover rounded-lg'
        />
      ) : (
        <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
          No Image Available
        </div>
      )}
      
      <div className='p-2'>
        <h2 className='font-medium text-lg flex justify-between items-center'>
          {recipe?.content?.recipeName || 'Untitled Recipe'}
          <DropdownOption handleOnDelete={()=>handleOnDelete()}>
            <HiEllipsisVertical />
          </DropdownOption>
        </h2>
        <p className='text-sm text-gray-400 my-1'>
          {recipe?.content?.cuisineCategory || 'No category'}
        </p>
        <div className='flex items-center justify-between'>
          <h2 className='flex gap-2 items-center p-1 bg-pink-100 text-sm rounded-sm' style={{ color: '#E45C55' }}>
            <HiOutlineClipboardDocumentCheck />
            {recipe?.content?.cuisine || 'Unknown'}
          </h2>
          <h2 className='text-sm p-1 rounded-sm bg-pink-100' style={{ color: '#E45C55' }}>
            {recipe?.content?.totalDuration || '00 mins'}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;