import React from 'react';
import { GrBasket } from "react-icons/gr";

function Ingredients({ recipe }) {
  return (
    <div className='mt-3'>
      <h2 className='font-medium text-xl'>Ingredients</h2>
      <div className='mt-2'>
        {recipe?.recipeOutput?.ingredients.map((item, index) => (
            <div className='border p-5 rounded-lg mb-2 flex items-center justify-between'>
          <div key={index} className='flex gap-5 items-center'>
            <h2
              style={{ backgroundColor: '#FF7B74' }}
              className='flex-none h-10 w-10 text-white rounded-full text-center p-2'>
              {index + 1}
            </h2>
            <div>
                <h2 className='font-medium text-lg'>{item?.name}</h2>
                <p style={{ color: '#FF7B74' }} className='text-sm text-gray-500 flex gap-2 items-center'><GrBasket />{item?.quantity}{item.unit}</p>
          </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ingredients;



