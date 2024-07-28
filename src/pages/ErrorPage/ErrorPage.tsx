import { Alert, Card, CardContent, CardHeader, Container } from "@mui/material";
import { red } from "@mui/material/colors";

export default function ErrorPage() {
    return (
        <Container maxWidth="xl">
            <Card variant="outlined" sx={{ m: 2, p: 2, color: red }}>
                <CardHeader title="Error" />
                <CardContent>
                    <Alert variant="filled" severity="error">
                        An error occur. Please contact administrator for more
                        information!
                    </Alert>
                </CardContent>
            </Card>
        </Container>
    );
}
