import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { HiMiniPencilSquare } from "react-icons/hi2";
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditRecipeBasicInfo() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; 

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} style={{ color: '#36454F' }}>
        <HiMiniPencilSquare size={24}/>
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
        <DialogTitle>{" Edit Recipe Cuisine or Description"}</DialogTitle>
        <DialogContent>
          <DialogContent id="alert-dialog-slide-description">
                <div className='mt-3'>
                    <label>Recipe Cuisine</label>
                    <Input/>
                </div>
                <div>
                    <label>Descriptions</label>
                    <TextField/>
                </div>
          </DialogContent>
        </DialogContent>
        <DialogActions>  
                <Button>Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default EditRecipeBasicInfo;

