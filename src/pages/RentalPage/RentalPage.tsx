import React, { useContext, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { RentalContext } from "../../contexts/RentalContext";

export default function RentalPage() {
    const {
        vehicles,
        reservations,
        searchQuery,
        searchVehicles,
        makeReservation,
        cancelReservation,
        setFilters,
        setSortBy,
    } = useContext(RentalContext);

    const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        searchVehicles(event.target.value);
    };

    const handleReservation = () => {
        if (selectedVehicleId) {
            // Placeholder userId and dates
            makeReservation(selectedVehicleId, 1, "2024-08-01", "2024-08-07");
        }
    };

    return (
        <Container maxWidth="xl">
            <Card variant="outlined" sx={{ m: 2, p: 2 }}>
                <CardHeader title="Rentals" />
                <CardContent>
                    <TextField
                        label="Search Vehicles"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            defaultValue=""
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <MenuItem value="price">Price</MenuItem>
                            <MenuItem value="year">Year</MenuItem>
                            {/* Add more sort options */}
                        </Select>
                    </FormControl>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={handleReservation}>
                        Make Reservation
                    </Button>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6">Available Vehicles</Typography>
                    <List>
                        {vehicles
                            .filter((vehicle) => vehicle.available)
                            .map((vehicle) => (
                                <ListItem
                                    key={vehicle.id}
                                    button
                                    selected={selectedVehicleId === vehicle.id}
                                    onClick={() => setSelectedVehicleId(vehicle.id)}
                                >
                                    <ListItemText
                                        primary={`${vehicle.make} ${vehicle.model} (${vehicle.year})`}
                                        secondary={`Price: $${vehicle.pricePerDay} / day`}
                                    />
                                </ListItem>
                            ))}
                    </List>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6">Existing Reservations</Typography>
                    <List>
                        {reservations.map((reservation) => (
                            <ListItem key={reservation.id}>
                                <ListItemText
                                    primary={`Vehicle ID: ${reservation.vehicleId}`}
                                    secondary={`Reservation Dates: ${reservation.startDate} - ${reservation.endDate}`}
                                />
                                <IconButton onClick={() => cancelReservation(reservation.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Container>
    );
}
