'use client'; 

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CuisineOptions from '../../../_shared/CategoryList';
import { HiMiniPencilSquare } from "react-icons/hi2";
import TextField from '@mui/material/TextField';
import { updateRecipeInDatabase, generateRecipeOutput } from '../../../actions/actions'; 

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditRecipeBasicInfo({ recipe, refreshData }) {
  const [open, setOpen] = useState(false);
  const [cuisine, setCuisine] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (recipe && recipe.recipeOutput) {
      setCuisine(recipe.recipeOutput.cuisine ?? '');
      setCategory(recipe.recipeOutput.cuisineCategory ?? '');
      setDescription(recipe.recipeOutput.description ?? '');
    }
  }, [recipe]);

  const onUpdateHandler = async () => {
    let updatedRecipeOutput = { ...recipe.recipeOutput };

    try {
      // If cuisine has changed, generate new recipe output
      if (cuisine !== recipe.recipeOutput.cuisine) {
        console.log('Cuisine changed, generating new recipe...');
        const newRecipeOutput = await generateRecipeOutput(cuisine);

        updatedRecipeOutput = {
          ...newRecipeOutput,
          cuisine,
          cuisineCategory: cuisine,
        };

      } else {
        // If only description is changed, update description
        updatedRecipeOutput = {
          ...recipe.recipeOutput,
          cuisine,
          cuisineCategory: cuisine,
          description,
        };
      }

      await updateRecipeInDatabase(recipe.recipeId, updatedRecipeOutput, cuisine, description);
      console.log('Recipe updated successfully.');

      // Refresh full recipe data
      await refreshData();

    } catch (error) {
      console.error('Error updating recipe:', error);
    }

    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} style={{ color: '#36454F' }}>
        <HiMiniPencilSquare size={24} />
      </Button>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit Recipe Cuisine or Description"}</DialogTitle>
        <DialogContent>
          <div className='mt-3'>
  <label>Recipe Cuisine</label>
  <Select
    value={cuisine}
    onChange={(event) => setCuisine(event.target.value)}
    fullWidth
  >
    {CuisineOptions.map((option) => (
      <MenuItem key={option.id} value={option.name}>
        {option.name}
      </MenuItem>
    ))}
  </Select>
</div>
          <div className='mt-3'>
            <label>Description</label>
            <TextField
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              multiline
              rows={4}
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onUpdateHandler}>Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default EditRecipeBasicInfo;

