import {
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
} from "@mui/material";
import DashboardAdmin from "../../components/Dashboard/DashboardAdmin";

export default function DashboardPage() {
    return (
        <Container maxWidth="xl">
            <Card variant="outlined" sx={{ m: 2, p: 2 }}>
                <CardHeader title="Dashboard" />
                <CardContent>
                    <DashboardAdmin/>
                </CardContent>
            </Card>
        </Container>
    );
}
