import React, { useContext }  from 'react'
import CategoryList from '../../_shared/CategoryList';
import Image from 'next/image'
import { UserInputContext } from '../../_context/UserInputContext';

function SelectCategory() {
  const {userRecipeInput,setUserRecipeInput}=useContext(UserInputContext);

  const handleCategoryChange = (category) => {
  setUserRecipeInput((prev) => ({
    ...prev,
    category: prev.category === category ? '' : category, // Toggle selection
  }));
};

  return (
    <div className='px-10 md:px-20'>
      <h2 className='my-5'>Select the Recipe Category</h2>
   
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 '>
  {CategoryList.map((item, index) => (
    <div 
  key={index}
  className={`flex flex-col p-5 border items-center rounded-xl hover:border-[#FF7B74] hover:bg-pink-50 cursor-pointer
    ${userRecipeInput?.category === item.name ? 'border-[#FF7B74] bg-pink-100' : ''}`}
  onClick={() => handleCategoryChange(item.name)}
>
      <Image src={item.icon} width={50} height={50} alt={item.name} />
      <h2 className='mt-2 font-medium'>{item.name}</h2>
    </div>
  ))}
</div>
 </div>
  )
}

export default SelectCategory;
