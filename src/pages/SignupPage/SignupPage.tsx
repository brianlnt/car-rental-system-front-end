import { Card, CardContent, CardHeader, Container } from "@mui/material";
import SignupForm from "../../components/Signup/SignupForm";

export default function SignupPage() {
    return (
        <Container maxWidth="xl">
            <Card variant="outlined" sx={{ m: 2, p: 2 }}>
                <CardContent>
                    <SignupForm />
                </CardContent>
            </Card>
        </Container>
    );
}
