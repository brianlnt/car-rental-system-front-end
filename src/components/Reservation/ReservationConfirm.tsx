import React, { useContext, useState } from "react";
import {
    Container,
    Card,
    Typography,
    TextField,
    Button,
    Grid,
    Box,
    Divider,
    Collapse,
    IconButton,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    Checkbox,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SessionStorageService } from "../../services/sessionStorageService";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ReservationService } from "../../services/reservation/reservationService";
import { Reservation } from "../../models/reservation";
import { GlobalContext } from "../../contexts/GlobalContext";
import { ReservationContext } from "../../contexts/ReservationContext";
import { CustomError } from "../../utils/customError";
import ReservationManagement from "./ReservationManagement";


export default function ReservationConfirm() {
    const location = useLocation();
    const { selectedVehicle } = location.state;
    const [expanded, setExpanded] = useState(false);
    const sessionStorageService = new SessionStorageService();
    const user = sessionStorageService.getCurrentUserInfo();
    const [start, setStart] = useState<Dayjs | null>(dayjs().startOf('day'));
    const [end, setEnd] = useState<Dayjs | null>(dayjs().add(1, 'day').startOf('day'));
    const reservationService = new ReservationService();
    const { updateLoading, updateNotification } = useContext(GlobalContext);
    const {
        updateIsShowAddReservationDialog,
        updateIsCompletedAddReservation,
        isShowReservationManagement,
        updateIsShowReservationManagement,
    } = useContext(ReservationContext);
    const [reservation, setReservation] = useState<Reservation | null>(null);

    // State for payment information
    // const [cardNumber, setCardNumber] = useState<string>('');
    // const [cardName, setCardName] = useState<string>('');
    // const [expiryDate, setExpiryDate] = useState<string>('');
    // const [cvv, setCvv] = useState<string>('');

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleConfirmReservation = async (data: {
        userId: number;
        vehicleId: number;
        reservationDate: Date;
        effectiveDate: Date;
        expirationDate: Date;
    }): Promise<void> => {
        try {
            updateLoading(true);
            updateIsShowReservationManagement(true);
            const reservation: Reservation = {
                reservationId: 0,
                userId: data.userId,
                vehicleId: data.vehicleId,
                reservationDate: data.reservationDate,
                effectiveDate: data.effectiveDate,
                expirationDate: data.expirationDate,
            };
            const addedReservation = await reservationService.addReservation(reservation);
            setReservation(addedReservation);
            updateLoading(false);
            updateIsShowAddReservationDialog(false);
            updateIsCompletedAddReservation(true);
            updateNotification({
                status: "success",
                message: "Create reservation successfully",
            });
        } catch (error) {
            updateLoading(false);
            updateNotification({
                status: "error",
                message:
                    error instanceof CustomError
                        ? error.message
                        : "Unknow message",
            });
        }
    };

    if(isShowReservationManagement) return <ReservationManagement reservation = {reservation}/>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Review & Reserve
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    {/* Economy Card */}
                    <Card variant="outlined" sx={{ p: 2 }}>
                        
                        <Typography variant="h6">Rental Details</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                            <Box>
                                <Typography variant="subtitle1" sx={{mb: 2}}>Dates & Times</Typography>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Start Date"
                                    value={start}
                                    onChange={(newStart) => setStart(newStart)}
                                    
                                    />
                                <DateTimePicker
                                    label="End Date"
                                    value={end}
                                    onChange={(newEnd) => setEnd(newEnd)}
                                    sx={{ml: 2}}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <img src={selectedVehicle.image} alt={selectedVehicle.make} style={{ width: '100px', height: '60px', marginRight: '16px' }} />
                            <Box>
                                <Typography variant="subtitle1">{selectedVehicle.make} {selectedVehicle.model} or similar</Typography>
                                <Typography variant="body2" color="textSecondary">Automatic</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1">Vehicle</Typography>
                            <Typography variant="body2">Time & Distance 1 Day(s) @ ${selectedVehicle.rentalPrice} / Day</Typography>
                            <Typography variant="body2">Unlimited Mileage</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                            <Typography variant="body2" color="textSecondary">Total</Typography>
                            <Typography variant="body2">${selectedVehicle.rentalPrice}</Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                            <Typography variant="body2" color="textSecondary">Taxes & Fees</Typography>
                            <IconButton
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </Box>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body2">AIRPORT CONCESSION FEE 11.11 PCT (11.11%)</Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>${(selectedVehicle.rentalPrice * 11.11/100).toFixed(2)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body2">CUSTOMER FACILITY CHARGE $9.00/DAY</Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>${(selectedVehicle.rentalPrice * 9/100).toFixed(2)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body2">TOURISM COMMISSION REC 3.50 PCT (3.5%)</Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>${(selectedVehicle.rentalPrice * 3.5/100).toFixed(2)}</Typography>
                            </Box> 
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body2">SALES TAX (7.75%)</Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>${(selectedVehicle.rentalPrice * 7.75/100).toFixed(2)}</Typography>
                            </Box>   
                                <Button variant="text" color="primary">Learn More</Button>
                            </Box>
                        </Collapse>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">Estimated Total</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                ${(selectedVehicle.rentalPrice + (selectedVehicle.rentalPrice * 9/100)
                                                                + (selectedVehicle.rentalPrice * 3.5/100)
                                                                + (selectedVehicle.rentalPrice * 3.5/100)
                                                                + (selectedVehicle.rentalPrice * 7.75/100)).toFixed(2)}
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                            *Rates, taxes and fees do not reflect rates, taxes and fees applicable to non-included optional coverages or extras added later. Pay Later charges will be in your destination's local currency.
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        {/* Payment Method */}
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>Payment Method</Typography>
                            <TextField
                                label="Card Number"
                                fullWidth
                                required
                                sx={{ mb: 2 }}
                                // value={{cardNumber}}
                                // onChange={(e) => setCardNumber(e.target.value)}
                            />
                            <TextField
                                label="Name on Card"
                                fullWidth
                                required
                                sx={{ mb: 2 }}
                                // value={{cardName}}
                                // onChange={(e) => setCardName(e.target.value)}
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Expiry Date (MM/YY)"
                                        fullWidth
                                        required
                                        sx={{ mb: 2 }}
                                        // value={{expiryDate}}
                                        // onChange={(e) => {setExpiryDate(e.target.value)}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="CVV"
                                        fullWidth
                                        required
                                        sx={{ mb: 2 }}
                                        // value={{cvv}}
                                        // onChange={(e) => setCvv(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                    </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Contact Details</Typography>
                        <TextField label="First Name" fullWidth required sx={{ mb: 2 }} />
                        <TextField label="Last Name" fullWidth required sx={{ mb: 2 }} />
                        <TextField label="Phone Number" fullWidth required sx={{ mb: 2 }} />
                        <TextField label="Email Address" fullWidth required sx={{ mb: 2 }} />
                        <FormControl component="fieldset" sx={{ mb: 2 }}>
                            <Typography variant="body1">Would you like to receive SMS notifications from Enterprise about this rental?</Typography>
                            <RadioGroup aria-label="sms" defaultValue="yes" name="radio-buttons-group">
                                <FormControlLabel value="yes" control={<Radio />} label="Yes, I would like to receive text messages about this rental to the phone number on this reservation" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                By selecting "Yes" above, message and data rates may apply. Message frequency varies and depends on the activity of your reservation. You can opt out by responding STOP at any time. For more information, please review our <a href="#">Privacy Policy</a> and <a href="#">SMS Terms</a>. If you choose not to receive text messages, we will give you a courtesy reminder call 1-2 days prior to your reservation.
                            </Typography>
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Sign up for Enterprise Email Specials"
                            sx={{ alignItems: 'flex-start', mb: 2 }}
                        />
                        <Typography variant="body2" color="textSecondary">
                            By selecting this box, you would like to receive email promotions and offers from Enterprise Rent-A-Car (as well as affiliated entities). You also agree that we can use your information and interactions with emails to perform analytics and produce content and ads tailored to your interests. You may see these tailored advertisements and offers on non-Enterprise sites, including on social media and digital advertising platforms. Please understand that there is no charge and that you can unsubscribe at any time by (i) using the links provided in the emails, (ii) managing your preferences in your Enterprise profile, or (iii) contacting us directly.
                        </Typography>
                    </Card>
                
                </Grid>

                <Grid item xs={12}>
                    <Card sx={{ p: 2, mt: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Complete Your Booking</Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>You will be charged when you pick up your rental.</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>${(selectedVehicle.rentalPrice + (selectedVehicle.rentalPrice * 9/100)
                                                                + (selectedVehicle.rentalPrice * 3.5/100)
                                                                + (selectedVehicle.rentalPrice * 3.5/100)
                                                                + (selectedVehicle.rentalPrice * 7.75/100)).toFixed(2)}</Typography>
                            <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ fontWeight: 'bold'}} 
                            onClick={() => 
                                    handleConfirmReservation({
                                        userId: user?.id || 0, 
                                        vehicleId: selectedVehicle.vehicleId, 
                                        reservationDate: new Date(), 
                                        effectiveDate: start?.toDate() || new Date(),
                                        expirationDate: end?.toDate() || new Date()
                                    })}>
                                Reserve Now
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
