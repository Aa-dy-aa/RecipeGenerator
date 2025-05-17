import React, { useContext }   from 'react';
import { TextField, Typography } from '@mui/material';
import { UserInputContext } from '../../_context/UserInputContext';

function Ingredients() {
  const {userRecipeInput,setUserRecipeInput}=useContext(UserInputContext);
  const handleInputChange=(fieldName,value)=>{
    setUserRecipeInput(prev=>({
      ...prev,
      [fieldName]:value
    }))
  }
  return (
    <div className='mx-4 sm:mx-20 lg:mx-44 mt-10 space-y-8'>
      <div>
        <Typography variant="h6" className='mb-2 font-semibold text-gray-800'>
          Write the Name of the Dish for which you want to generate a recipe
        </Typography>
        <TextField
          placeholder="Topic"
          defaultValue={userRecipeInput?.topic}
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e)=>handleInputChange('topic',e.target.value)}
        />
      </div>

      <div>
        <Typography variant="h6" className='mb-2 font-semibold text-gray-800'>
          Tell us more about what ingredients you want to include in your recipe (Optional)
        </Typography>
        <TextField
          placeholder="About your Recipe"
          multiline
          rows={4}
          defaultValue={userRecipeInput?.description}
          variant="outlined"
          fullWidth
          onChange={(e)=>handleInputChange('description',e.target.value)}
        />
      </div>
    </div>
  );
}

export default Ingredients;
