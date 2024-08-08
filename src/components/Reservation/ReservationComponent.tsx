import React from "react";
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

export default function ReservationComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedVehicle } = location.state;
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleConfirmReservation = () => {
        // Handle reservation confirmation logic here
        console.log("Reservation confirmed");
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Review & Reserve
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    {/* Economy Card */}
                    <Card variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="h6">Economy</Typography>
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle1">Extras</Typography>
                            <Button variant="outlined" color="primary">Add</Button>
                        </Box>
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
                                <Typography variant="body2">$29.41*</Typography>
                            </Box>
                        </Collapse>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">Estimated Total</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>${(selectedVehicle.rentalPrice + 29.41).toFixed(2)}</Typography>
                        </Box>
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                            *Rates, taxes and fees do not reflect rates, taxes and fees applicable to non-included optional coverages or extras added later. Pay Later charges will be in your destination's local currency.
                        </Typography>
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
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>${(selectedVehicle.rentalPrice + 29.41).toFixed(2)}</Typography>
                            <Button variant="contained" color="primary" sx={{ fontWeight: 'bold'}} onClick={handleConfirmReservation}>
                                Reserve Now
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
