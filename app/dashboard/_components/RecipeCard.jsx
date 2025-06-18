import React from 'react'
import Image from 'next/image'
import { HiEllipsisVertical } from "react-icons/hi2";
import {  HiOutlineClipboardDocumentCheck} from "react-icons/hi2";
import DropdownOption from '../_components/DropdownOption'

function RecipeCard({recipe}) {
  return (
    <div className='shadow-sm rounded-lg border p-2 cursor-pointer mt-4 hover:border-[#E45C55]'>
      <Image src={recipe?.recipeBanner} width={300} height={200} alt="Banner" className='w-full h-[200px] object-cover rounded-lg'/>
      <div className='p-2'>
        <h2 className='font-medium text-lg flex justify-between items-center'>{recipe?.recipeOutput?.recipeName}
        <DropdownOption>
          <HiEllipsisVertical />
        </DropdownOption>
        </h2>
        <p className='text-sm text-gray-400 my-1'>{recipe?.recipeOutput?.cuisineCategory}</p>
        <div className='flex items-center justify-between'>
          <h2 className='flex gap-2 items-center p-1 bg-pink-100 text-sm rounded-sm' style={{ color: '#E45C55' }}><HiOutlineClipboardDocumentCheck/>{recipe?.recipeOutput?.cuisine}</h2>
          <h2 className='text-sm p-1 rounded-sm bg-pink-100' style={{ color: '#E45C55' }}>{recipe?.recipeOutput?.totalDuration}</h2>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard