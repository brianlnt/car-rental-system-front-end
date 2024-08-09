import React, { useContext, useEffect, useState } from 'react';
import {
    Container,
    Card,
    Typography,
    List,
    ListItem,
    Divider,
    Box,
    Button,
    Grid,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReservationService } from '../../services/reservation/reservationService';
import { ReservationContext } from '../../contexts/ReservationContext';
import { GlobalContext } from '../../contexts/GlobalContext';
import { Reservation } from '../../models/reservation';


export default function MyReservation() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const reservationService = new ReservationService();
    const {updateLoading} = useContext(GlobalContext);

    const fetchReservation =  async () => {
        updateLoading(true);
        const reservations  = await reservationService.getAllReservations();
        setReservations(reservations);
        updateLoading(false);
    }

    useEffect(() => {
        // Mock data - replace with actual data fetching logic
        fetchReservation();
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
            My Reservations
        </Typography>
        <Card variant="outlined" sx={{ p: 3 }}>
            <List>
                {reservations.map(reservation => (
                    <React.Fragment key={reservation.reservationId}>
                        <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                            <Box>
                                <Typography variant="h6">Reservation Date: {reservation.reservationDate.toString()}</Typography>
                                <Typography variant="body2">Start Date: {reservation.effectiveDate.toString()}</Typography>
                                <Typography variant="body2">Return Date: {reservation.expirationDate.toString()}</Typography>
                            </Box>
                            <IconButton
                                aria-label="cancel reservation"
                                onClick={() => {}}
                                sx={{ position: 'absolute', top: 8, right: 8 }}
                            >
                                <CloseIcon sx={{mb: 0, color: 'red'}} />
                            </IconButton>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Card>
    </Container>
    );
};
