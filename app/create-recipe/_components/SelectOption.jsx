import React, { useState, useContext } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { UserInputContext } from '../../_context/UserInputContext';

function SelectOption() {
  const { userRecipeInput, setUserRecipeInput } = useContext(UserInputContext);

  const [cuisine, setCuisine] = useState(userRecipeInput?.cuisine || '');
  const [duration, setDuration] = useState(userRecipeInput?.duration || '');
  const [addVideo, setAddVideo] = useState(userRecipeInput?.addVideo || '');

  const handleInputChange = (field, value) => {
    setUserRecipeInput(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className='px-10 md:px-20 lg:px-44 py-10'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {/* Cuisine Selector */}
        <div>
          <FormControl fullWidth>
            <InputLabel id="cuisine-label">Select Cuisine Category</InputLabel>
            <Select
              labelId="cuisine-label"
              value={cuisine}
              label="Select Cuisine Category"
              onChange={(e) => {
                setCuisine(e.target.value);
                handleInputChange('cuisine', e.target.value);
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="vegetarian">Vegetarian</MenuItem>
              <MenuItem value="non-vegetarian">Non-Vegetarian</MenuItem>
              <MenuItem value="vegan">Vegan</MenuItem>
              <MenuItem value="dessert">Dessert</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Duration Selector */}
        <div>
          <FormControl fullWidth>
            <InputLabel id="duration-label">Select Duration</InputLabel>
            <Select
              labelId="duration-label"
              value={duration}
              label="Select Duration"
              onChange={(e) => {
                setDuration(e.target.value);
                handleInputChange('duration', e.target.value);
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="20mins">20mins</MenuItem>
              <MenuItem value="45mins">45mins</MenuItem>
              <MenuItem value="60mins">60mins</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Video Option */}
        <div>
          <FormControl fullWidth>
            <InputLabel id="video-label">Add Video?</InputLabel>
            <Select
              labelId="video-label"
              value={addVideo}
              label="Add Video?"
              onChange={(e) => {
                setAddVideo(e.target.value);
                handleInputChange('addVideo', e.target.value);
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default SelectOption;




