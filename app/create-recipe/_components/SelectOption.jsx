import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function SelectOption() {
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');

  return (
    <div className='px-10 md:px-20 lg:px-44 py-10'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        <div>
          <FormControl fullWidth>
            <InputLabel id="category-label">Select Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              label="Select Category"
              onChange={(e) => setCategory(e.target.value)}
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
              label="Select Duration"
              onChange={(e) => setDuration(e.target.value)}
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

