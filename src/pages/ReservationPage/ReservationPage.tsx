import { Container } from "@mui/material";
import ReservationComponent from "../../components/Reservation/ReservationComponent";

export default function ReservationPage() {
    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <ReservationComponent/>
        </Container>
    );
}
