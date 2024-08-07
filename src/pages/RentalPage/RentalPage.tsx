import React, { useContext, useState } from "react";
import VehicleCardList from "../../components/Rental/VehicleCardList";
import { Box, Container, Grid } from "@mui/material";

export default function RentalPage() {

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <VehicleCardList/>
        </Container>
    );
}
