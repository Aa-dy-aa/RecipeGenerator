import React from 'react';
import { TextField, Typography } from '@mui/material';

function Ingredients() {
  return (
    <div className='mx-4 sm:mx-20 lg:mx-44 mt-10 space-y-8'>
      <div>
        <Typography variant="h6" className='mb-2 font-semibold text-gray-800'>
          Write the Category for which you want to generate a recipe
        </Typography>
        <TextField
          placeholder="Topic"
          variant="outlined"
          fullWidth
          size="small"
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
          variant="outlined"
          fullWidth
        />
      </div>
    </div>
  );
}

export default Ingredients;
