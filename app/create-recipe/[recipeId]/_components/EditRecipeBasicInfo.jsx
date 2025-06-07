'use client'; 

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { HiMiniPencilSquare } from "react-icons/hi2";
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import { updateRecipeInDatabase } from '../../../actions/actions'; 

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
    const updatedRecipeOutput = {
      ...recipe.recipeOutput,
      cuisine,
      cuisineCategory: cuisine, // Set cuisineCategory to same as cuisine
      description,
    };

    try {
      await updateRecipeInDatabase(
        recipe.recipeId,
        updatedRecipeOutput,
        cuisine, // for main table "cuisine"
        description // for main table "description"
      );
      console.log('Recipe updated successfully.');

      // Close dialog
      setOpen(false);

      // Refresh data AFTER closing the dialog
      refreshData();

    } catch (error) {
      console.error('Error updating recipe:', error);
    }
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
            <Input
              value={cuisine}
              onChange={(event) => setCuisine(event.target.value)}
              fullWidth
            />
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
