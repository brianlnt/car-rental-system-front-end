import { Card, CardContent, CardHeader, Container } from "@mui/material";
import LoginForm from "../../components/Login/LoginForm";

export default function LoginPage() {
    return (
        <Container maxWidth="xl">
            <Card variant="outlined" sx={{ m: 2, p: 2 }}>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </Container>
    );
}
