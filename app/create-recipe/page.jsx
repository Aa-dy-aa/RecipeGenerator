"use client";
import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../../components/ui/button';
import { UserInputContext } from '../_context/UserInputContext';
import { GenerateRecipeLayout_AI } from '../../configs/AiModel';
import { HiViewGrid, HiServer, HiOutlineAdjustments } from "react-icons/hi";
import SelectCategory from './_components/SelectCategory';
import SelectOption from './_components/SelectOption';
import Ingredients from './_components/Ingredients';
import LoadingDialog from './_components/LoadingDialog';
// import {useUser} from '@clerk/nextjs';
import { saveRecipeToDatabase } from '../actions/actions';
import {useRouter} from 'next/navigation';

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
  const { userRecipeInput } = useContext(UserInputContext);
  const [loading, setLoading] = useState(false);
  // const {user}=useUser();
  const router=useRouter()

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

  const GenerateRecipeLayout = async () => {
  setLoading(true);

  const cuisineType = userRecipeInput?.cuisine; // e.g., Italian, Indian
  const cuisineCategory = userRecipeInput?.category; // e.g., veg, non veg, dessert
  const ingredients = userRecipeInput?.topic;
  const duration = userRecipeInput?.duration;
  const description= userRecipeInput?.description;

  const USER_INPUT_PROMPT = `
Generate a detailed recipe using the following constraints:
- Cuisine Type (e.g. Indian, Italian, Mexican): "${cuisineType}"
- Cuisine Category (e.g. veg, non veg, dessert, vegan): "${cuisineCategory}"
- Ingredients (with quantity): "${ingredients}"
- Preparation Duration: "${duration}"
- Preparation Description: "${description}"

Output the result strictly as a JSON object with the following fields:
{
  "recipeName": string,
  "cuisine": string,
  "cuisineCategory": string,
  "info": string,
  "serves": number,
  "caloriesPerServing": number,
  "description":description,
  "ingredients": [
    {
      "name": string,
      "quantity": string,
      "unit": string
    }
  ],
  "totalDuration": string,
  "steps": [
    "Step 1 instruction...",
    "Step 2 instruction...",
    ...
  ]
}
  Info would include a basic introduction of the recipe in about 50-60 words.
Ensure the recipe is an authentic ${cuisineType} dish. Do not include any introductory text or notes. Only output the JSON object.
`;

  console.log("Prompt Sent to AI:\n", USER_INPUT_PROMPT);
  try {
      const result = await GenerateRecipeLayout_AI.sendMessage(USER_INPUT_PROMPT);
      const responseText = result.response?.text();
      console.log("Raw Response from AI:\n", responseText);

      const recipeLayout = JSON.parse(responseText);
      console.log("Parsed Recipe:\n", recipeLayout);

      const saveResult = await saveRecipeToDatabase(
        recipeLayout,
        cuisineType,
        cuisineCategory,
        duration,
        user?.primaryEmailAddress?.emailAddress,
        user?.fullName,                     
        user?.imageUrl ,
        recipeLayout.info,
        recipeLayout.serves,
        recipeLayout.caloriesPerServing,
        description                     
      );

      if (saveResult.success) {
        console.log("Recipe saved successfully from server action!");
        const recipeId = saveResult.data?.recipeId; // <--- Get the ID from saveResult.data

        if (recipeId) {
          router.replace('/create-recipe/' + recipeId); 
        } else {
          console.error("Recipe ID was not returned by the server action.");
          router.replace('/dashboard'); // Or some other fallback route
        }
      } else {
        console.error("Failed to save recipe:", saveResult.message);
      }
    } catch (err) {
      console.error("Error during recipe generation or save:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Stepper */}
      <div className='flex flex-col justify-center items-center mt-10'>
        <h2 className='text-4xl text-[#FF7B74] font-medium'>Create Recipe</h2>

        <div className='flex items-center mt-8'>
          {StepperOptions.map((item, index) => (
            <div key={item.id} className='flex items-center'>
              <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                <div className={`p-3 rounded-full text-white text-xl w-12 h-12 flex items-center justify-center
                  ${activeIndex >= index ? 'bg-[#FF7B74]' : 'bg-gray-200'}`}>
                  {item.icon}
                </div>
                <h2 className='hidden md:block md:text-sm mt-2 text-center text-black font-semibold'>
                  {item.name}
                </h2>
              </div>
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
                onClick={() => GenerateRecipeLayout()}
                className='bg-[#FF7B74] hover:bg-[#ff6b62] text-white font-bold'
              >
                Generate Recipe Layout
              </Button>
            )}
          </div>
        </div>
      </div>
      <LoadingDialog loading={loading}/>
    </div>
  );
}

export default CreateRecipe;









