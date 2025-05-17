import React, { useState, useContext } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { UserInputContext } from '../../_context/UserInputContext';

function SelectOption() {
  const { userRecipeInput, setUserRecipeInput } = useContext(UserInputContext);

  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');

  const handleInputChange = (field, value) => {
    setUserRecipeInput(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className='px-10 md:px-20 lg:px-44 py-10'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        <div>
          <FormControl fullWidth>
            <InputLabel id="category-label">Select Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              defaultValue={userRecipeInput?.category}
              label="Select Category"
              onChange={(e) => {
                setCategory(e.target.value);
                handleInputChange('category', e.target.value);
              }}
            >
              <MenuItem value="vegetarian">Vegetarian</MenuItem>
              <MenuItem value="non-vegetarian">Non-Vegetarian</MenuItem>
              <MenuItem value="vegan">Vegan</MenuItem>
              <MenuItem value="dessert">Dessert</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id="duration-label">Select Duration</InputLabel>
            <Select
              labelId="duration-label"
              value={duration}
              defaultValue={userRecipeInput?.duration}
              label="Select Duration"
              onChange={(e) => {
                setDuration(e.target.value);
                handleInputChange('duration', e.target.value);
              }}
            >
              <MenuItem value="20mins">20mins</MenuItem>
              <MenuItem value="45mins">45mins</MenuItem>
              <MenuItem value="60mins">60mins</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default SelectOption;


