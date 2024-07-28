import {
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
} from "@mui/material";

export default function UserPage() {
    return (
        <Container maxWidth="xl">
            <Card variant="outlined" sx={{ m: 2, p: 2 }}>
                <CardHeader title="User Management" />
                <CardContent>User Page</CardContent>
            </Card>
        </Container>
    );
}
