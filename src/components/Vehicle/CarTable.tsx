import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Car } from '../../models/Car';

interface CarTableProps {
  cars: Car[];
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEdit: (car: Car) => void;
  handleDelete: (id: string) => void;
  searchQuery: string;
}

const CarTable: React.FC<CarTableProps> = ({
  cars,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleEdit,
  handleDelete,
  searchQuery,
}) => {
  const filteredCars = cars.filter(car =>
    car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.year.toString().includes(searchQuery.toLowerCase()) ||
    car.pricePerDay.toString().includes(searchQuery.toLowerCase())
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Actions</TableCell>
            <TableCell>Id</TableCell>
            <TableCell>Make</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Plate Number</TableCell>
            <TableCell>Price Per Day</TableCell>
            <TableCell>Availability</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCars.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((car) => (
            <TableRow key={car.id}>
              <TableCell>
                <IconButton onClick={() => handleEdit(car)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(car.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell>{car.id}</TableCell>
              <TableCell>{car.make}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>{car.year}</TableCell>
              <TableCell>{car.licensePlateNumber}</TableCell>
              <TableCell>{car.pricePerDay}</TableCell>
              <TableCell>{car.availability ? 'Available' : 'Unavailable'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredCars.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default CarTable;
