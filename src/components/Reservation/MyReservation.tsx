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
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReservationService } from '../../services/reservation/reservationService';
import { GlobalContext } from '../../contexts/GlobalContext';
import { Reservation } from '../../models/reservation';
import { CustomError } from '../../utils/customError';


export default function MyReservation() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);
    const reservationService = new ReservationService();
    const { updateLoading, updateNotification } = useContext(GlobalContext);

    const fetchReservation = async () => {
        updateLoading(true);
        const reservations = await reservationService.getAllReservations();
        setReservations(reservations);
        updateLoading(false);
    }

    useEffect(() => {
        fetchReservation();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            updateLoading(true);
            await reservationService.deleteReservationById(id);
            updateLoading(false);
            updateNotification({
                status: "success",
                message: "Delete reservation successfully",
            });
            fetchReservation();
        } catch (error) {
            updateLoading(false);
            updateNotification({
                status: "error",
                message:
                    error instanceof CustomError
                        ? error.message
                        : "Unknown error occurred",
            });
        }
    }

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
                                    <Typography variant="h6">Reservation #: {reservation.reservationId}</Typography>
                                    <Typography variant="body2">Start Date: {reservation.effectiveDate.toString()}</Typography>
                                    <Typography variant="body2">Return Date: {reservation.expirationDate.toString()}</Typography>
                                </Box>
                                <IconButton
                                    aria-label="cancel reservation"
                                    onClick={() => {
                                        setSelectedReservationId(reservation.reservationId);
                                        setOpenModal(true);
                                    }}
                                    sx={{ position: 'absolute', top: 8, right: 8 }}
                                >
                                    <CloseIcon sx={{ mb: 0, color: 'red' }} />
                                </IconButton>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Card>

            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="confirm-dialog"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog">{"Confirm Cancelation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                        Are you sure you want to cancel this reservation?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        if (selectedReservationId !== null) {
                            handleDelete(selectedReservationId);
                        }
                        setOpenModal(false);
                    }} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};