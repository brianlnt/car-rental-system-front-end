// src/App.tsx
import React, { useState } from 'react';
import { Container, Button, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Car, initialCars } from '../../models/Car';
import CarTable from './CarTable';
import CarModal from './CarModal';

const CarMain: React.FC = () => {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCar, setCurrentCar] = useState<Car | null>(null);
  const [formValues, setFormValues] = useState<Car>({ id: '', make: '', model: '', year: new Date().getFullYear(), pricePerDay: 0, availability: true });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const handleClickOpen = (car?: Car) => {
    if (car) {
      setIsEditing(true);
      setFormValues(car);
      setCurrentCar(car);
    } else {
      setIsEditing(false);
      setFormValues({ id: '', make: '', model: '', year: new Date().getFullYear(), pricePerDay: 0, availability: true });
      setCurrentCar(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    if (isEditing && currentCar) {
      setCars(cars.map(car => (car.id === currentCar.id ? formValues : car)));
    } else {
      setCars([...cars, { ...formValues, id: Math.random().toString(36).substr(2, 9) }]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button variant="contained" color="primary" onClick={() => handleClickOpen()}>
          Add New Car
        </Button>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <CarTable
        cars={cars}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleEdit={handleClickOpen}
        handleDelete={handleDelete}
        searchQuery={searchQuery}
      />
      <CarModal
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSave={handleSave}
        formValues={formValues}
        isEditing={isEditing}
      />
    </Container>
  );
};

export default CarMain;
