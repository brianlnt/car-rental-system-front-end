import React, { useState, ChangeEvent } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  CardActions,
} from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import { Car } from '../../models/Car';

const CarManagement: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([
    {
      id: 1,
      model: 'Ford Edge',
      brand: 'Ford',
      type: 'Standard SUV',
      transmission: 'Automatic',
      capacity: '5 People',
      bags: '5 Bags',
      pricePerDay: 102.8,
      totalPrice: 138.04,
      image: 'https://build.ford.com/dig/Ford/Edge/2024/HD-TILE/Image%5B%7CFord%7CEdge%7C2024%7C1%7C1.%7C400A.K4A..PM7..886.89E.~3DM00_BCMAG.61P.HFS.53G.85W.644.TDU.AWD.99P.ST.61B.76L.59P.91B.SSR.58B.SYC.44F.~VS-DK.LMI.STT.%5D/EXT/1/vehicle.png',
    },
    {
      id: 2,
      model: 'Nissan Kicks',
      brand: 'Nissan',
      type: 'Compact SUV',
      transmission: 'Automatic',
      capacity: '5 People',
      bags: '3 Bags',
      pricePerDay: 60.45,
      totalPrice: 85.02,
      image: 'data:image/jpeg;base64,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',
    },
    // Add more car objects as needed
  ]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [currentCar, setCurrentCar] = useState<Partial<Car>>({});

  const handleAddCar = () => {
    if (currentCar.model && currentCar.brand) {
      setCars([...cars, { ...currentCar, id: cars.length + 1 } as Car]);
      handleClose();
    }
  };

  const handleUpdateCar = (id: number) => {
    setCurrentCar(cars.find(car => car.id === id) || {});
    setOpen(true);
  };

  const handleSaveCar = () => {
    setCars(cars.map(car => (car.id === currentCar.id ? currentCar as Car : car)));
    handleClose();
  };

  const handleDeleteCar = (id: number) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const handleSearch = () => {
    const filteredCars = cars.filter(car => car.model.includes(searchTerm) || car.brand.includes(searchTerm));
    setCars(filteredCars);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentCar({ ...currentCar, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentCar({});
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Vehicle Management
      </Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Search for a car"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <IconButton onClick={handleSearch}>
          <Search />
        </IconButton>
      </Box>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setOpen(true)} style={{ marginBottom: 16, position: 'relative', zIndex: 1500}}>
        Add Car
      </Button>
      <Grid container spacing={3}>
        {cars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <Card>
              <CardMedia
                component="img"
                alt={car.model}
                height="140"
                image={car.image}
                title={car.model}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {car.type}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {car.model} or similar
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {car.transmission} • {car.capacity} • {car.bags}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ${car.pricePerDay.toFixed(2)} Per Day • ${car.totalPrice.toFixed(2)} Total
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleUpdateCar(car.id)}>
                  Edit
                </Button>
                <Button size="small" color="secondary" onClick={() => handleDeleteCar(car.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose} sx={{ marginTop: 5 }}>
        <DialogTitle>{currentCar.id ? 'Update Car' : 'Add Car'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="model"
            label="Model"
            type="text"
            fullWidth
            value={currentCar.model || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="brand"
            label="Brand"
            type="text"
            fullWidth
            value={currentCar.brand || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="type"
            label="Type"
            type="text"
            fullWidth
            value={currentCar.type || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="transmission"
            label="Transmission"
            type="text"
            fullWidth
            value={currentCar.transmission || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="capacity"
            label="Capacity"
            type="text"
            fullWidth
            value={currentCar.capacity || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="bags"
            label="Bags"
            type="text"
            fullWidth
            value={currentCar.bags || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="pricePerDay"
            label="Price Per Day"
            type="number"
            fullWidth
            value={currentCar.pricePerDay || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="totalPrice"
            label="Total Price"
            type="number"
            fullWidth
            value={currentCar.totalPrice || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image URL"
            type="text"
            fullWidth
            value={currentCar.image || ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={currentCar.id ? handleSaveCar : handleAddCar} color="primary">
            {currentCar.id ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CarManagement;