"use client";
import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../../components/ui/button';
import { UserInputContext } from '../_context/UserInputContext';
import { HiViewGrid, HiServer, HiOutlineAdjustments } from "react-icons/hi";
import SelectCategory from './_components/SelectCategory';
import SelectOption from './_components/SelectOption';
import Ingredients from './_components/Ingredients';

const StepperOptions = [
  {
    id: 1,
    name: 'Category',
    icon: <HiViewGrid />
  },
  {
    id: 2,
    name: 'Ingredients',
    icon: <HiServer />
  },
  {
    id: 3,
    name: 'Options',
    icon: <HiOutlineAdjustments />
  }
];

function CreateRecipe() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { userRecipeInput, setUserRecipeInput } = useContext(UserInputContext);

  useEffect(() => {
    console.log(userRecipeInput);
  }, [userRecipeInput]);

  const checkStatus = () => {
    if (!userRecipeInput || Object.keys(userRecipeInput).length === 0) return true;

    if (activeIndex === 0 && !userRecipeInput.category) return true;
    if (activeIndex === 1 && (!userRecipeInput.topic || userRecipeInput.topic.length === 0)) return true;
    if (activeIndex === 2 && (!userRecipeInput.duration || userRecipeInput.duration.length === 0)) return true;

    return false;
  };

  return (
    <div>
      {/* Stepper */}
      <div className='flex flex-col justify-center items-center mt-10'>
        <h2 className='text-4xl text-[#FF7B74] font-medium'>Create Recipe</h2>

        <div className='flex items-center mt-8'>
          {StepperOptions.map((item, index) => (
            <div key={item.id} className='flex items-center'>
              {/* Step Icon */}
              <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                <div className={`p-3 rounded-full text-white text-xl w-12 h-12 flex items-center justify-center
                  ${activeIndex >= index ? 'bg-[#FF7B74]' : 'bg-gray-200'}`}>
                  {item.icon}
                </div>
                <h2 className='hidden md:block md:text-sm mt-2 text-center text-black font-semibold'>
                  {item.name}
                </h2>
              </div>

              {/* Connector Line */}
              {index < StepperOptions.length - 1 && (
                <div className={`h-1 w-[50px] md:w-[100px] mx-2 -mt-[15px] transition-all duration-300
                  ${activeIndex > index ? 'bg-[#FF7B74]' : 'bg-gray-300'}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className='px-10 md:px-20 lg:px-44 mt-10 w-full'>
          {activeIndex === 0 ? <SelectCategory /> :
            activeIndex === 1 ? <Ingredients /> :
              <SelectOption />}

          {/* Navigation Buttons */}
          <div className='flex justify-between w-full mt-6'>
            <Button
              disabled={activeIndex === 0}
              onClick={() => setActiveIndex(activeIndex - 1)}
              className='bg-[#FF7B74] hover:bg-[#ff6b62] text-white font-semibold'
            >
              Previous
            </Button>

            {activeIndex < StepperOptions.length - 1 ? (
              <Button
                disabled={checkStatus()}
                onClick={() => setActiveIndex(activeIndex + 1)}
                className='bg-[#FF7B74] hover:bg-[#ff6b62] text-white font-bold'
              >
                Next
              </Button>
            ) : (
              <Button
                disabled={checkStatus()}
                onClick={() => {
                  console.log('Generating Recipe Layout...');
                }}
                className='bg-[#FF7B74] hover:bg-[#ff6b62] text-white font-bold'
              >
                Generate Recipe Layout
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRecipe;








