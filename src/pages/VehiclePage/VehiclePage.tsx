import {
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
} from "@mui/material";

export default function VehiclePage() {
    return (
        <Container maxWidth="xl">
            <Card variant="outlined" sx={{ m: 2, p: 2 }}>
                <CardHeader title="Vehicle Management" />
                <CardContent>Vehicle Page</CardContent>
            </Card>
        </Container>
    );
}
