import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UserList from "../../components/User/UserList";

export default function UserPage() {
    const showAddUserDialog = () => {};

    return (
        <Container maxWidth="xl">
            <Card variant="outlined" sx={{ m: 2, p: 2 }}>
                <CardHeader
                    title="User Management"
                    sx={{ fontWeight: "bold" }}
                />
                <CardContent>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "flex" },
                            justifyContent: "right",
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={showAddUserDialog}
                            startIcon={<AddIcon />}
                        >
                            Add
                        </Button>
                    </Box>
                    <UserList />
                </CardContent>
            </Card>
        </Container>
    );
}
