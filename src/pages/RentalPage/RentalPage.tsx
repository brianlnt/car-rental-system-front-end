import {
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
} from "@mui/material";

export default function RentalPage() {
    return (
        <Container maxWidth="xl">
            <Card variant="outlined" sx={{ m: 2, p: 2 }}>
                <CardHeader title="Rentals" />
                <CardContent>Rentals Page</CardContent>
            </Card>
        </Container>
    );
}
