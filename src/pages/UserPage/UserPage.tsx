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
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import AddUserDialog from "../../components/User/AddUserDialog";
import EditUserDialog from "../../components/User/EditUserDialog";

export default function UserPage() {
    const {
        isShowAddUserDialog,
        updateIsShowAddUserDialog,
        isShowUpdateUserDialog,
    } = useContext(UserContext);

    const showAddUserDialog = () => {
        updateIsShowAddUserDialog(true);
    };

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
                            Add User
                        </Button>
                    </Box>
                    <UserList />
                </CardContent>
            </Card>
            {isShowAddUserDialog && <AddUserDialog />}
            {isShowUpdateUserDialog && <EditUserDialog />}
        </Container>
    );
}
