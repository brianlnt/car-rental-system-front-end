import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Car } from '../../models/Car';

interface CarModalProps {
  open: boolean;
  handleClose: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  formValues: Car;
  isEditing: boolean;
}

const CarModal: React.FC<CarModalProps> = ({
  open,
  handleClose,
  handleChange,
  handleSave,
  formValues,
  isEditing,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEditing ? 'Edit Car' : 'Add New Car'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', m: '8px' }}>
          <TextField
            margin="dense"
            name="make"
            label="Make"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.make}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="model"
            label="Model"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.model}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="year"
            label="Year"
            type="number"
            fullWidth
            variant="outlined"
            value={formValues.year}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="pricePerDay"
            label="Price Per Day"
            type="number"
            fullWidth
            variant="outlined"
            value={formValues.pricePerDay}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="availability"
                checked={formValues.availability}
                onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'availability', value: e.target.checked } } as unknown as React.ChangeEvent<HTMLInputElement>)}
              />
            }
            label="Available"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CarModal;
