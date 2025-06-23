import React from 'react'
import { HiClock } from "react-icons/hi2";

function IngredientsList({ingredient,index}) {
  return (
    <div className='grid grid-cols-5 p-4 items-center border-b'>
      <div>
        <h2 style={{ backgroundColor: '#FF7B74' }} className='p-1 w-8 h-8 text-white rounded-full text-center'>{index+1}</h2>
      </div>
      <div className='col-span-4'>
        <h2 className='font-medium'>{ingredient?.name}</h2>
        <h2  style={{ color: '#FF7B74' }} className='flex items-center gap-2 text-sm'><HiClock />{ingredient?.quantity}{ingredient?.unit}</h2>
      </div>
    </div>
  )
}

export default IngredientsList