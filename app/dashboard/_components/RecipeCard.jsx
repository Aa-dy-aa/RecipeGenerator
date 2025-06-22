import React,{useState,useEffect} from 'react';
import { HiEllipsisVertical, HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import DropdownOption from '../_components/DropdownOption';
import { getRecipeImageUrl } from '../../actions/getRecipeImage';
import Link from 'next/link';

function RecipeCard({ recipe,onDelete }) {
  const [fallbackImageUrl,setFallbackImageUrl]=useState(null);
 
  useEffect(()=>{
    async function fetchImage(){
      const imageUrl=await getRecipeImageUrl(recipe?.content?.recipeName);
      setFallbackImageUrl(imageUrl);
    }
    if(!recipe?.recipeBanner){
      fetchImage();
    }
  },[recipe?.content?.recipeName,recipe?.recipeBanner]);
  const finalImageSrc=recipe?.recipeBanner || fallbackImageUrl;
  
  const handleOnDelete=async()=>{
    const resp=await db.delete(RecipeList)
    .where(eq(RecipeList.id,recipe?.id))
    .returning({id:RecipeList?.id})
  }

  return (
    <div className='shadow-sm rounded-lg border p-2 cursor-pointer mt-4 hover:border-[#E45C55]'>
      <Link href={'/recipe/'+recipe?.recipeId}>
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
      </Link>
      
      <div className='p-2'>
        <h2 className='font-medium text-lg flex justify-between items-center'>
          {recipe?.content?.recipeName || 'Untitled Recipe'}
          <DropdownOption handleOnDelete={()=>onDelete(recipe.id)}>
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