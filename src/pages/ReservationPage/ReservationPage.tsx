import { Container } from "@mui/material";
import ReservationConfirm from "../../components/Reservation/ReservationConfirm";

export default function ReservationPage() {
    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <ReservationConfirm/>
        </Container>
    );
}
