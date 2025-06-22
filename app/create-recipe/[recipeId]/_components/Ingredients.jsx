import React from 'react';

function Ingredients({ recipe, edit }) {
  const isEditable = edit ?? true; // Default to true if undefined

  return (
    <div className='mt-3'>
      <h2 className='text-xl font-semibold mb-2'>Ingredients</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {recipe?.recipeOutput?.ingredients.map((item, index) => (
          <div key={index} className='flex items-start gap-3 border p-3 rounded-md shadow-sm'>
            {isEditable && (
              <div
                style={{ backgroundColor: '#FF7B74' }}
                className='h-8 w-8 text-white rounded-full text-center leading-8 font-semibold'>
                {index + 1}
              </div>
            )}
            <div>
              <h3 className='font-medium'>{item.name}</h3>
              <p className='text-sm text-gray-600'>
                {item.quantity} {item.unit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ingredients;




