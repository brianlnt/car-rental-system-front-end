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
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import AddUserDialog from "../../components/User/AddUserDialog";
import EditUserDialog from "../../components/User/EditUserDialog";
import { RoleService } from "../../services/role/roleService";
import { Role } from "../../models/Role";
import { GlobalContext } from "../../contexts/GlobalContext";
import { SessionStorageService } from "../../services/sessionStorageService";
import { RoleEnum } from "../../models/enums/RoleEnum";
import ConfirmDialog from "../../components/Common/ConfirmDialog/ConfirmDialog";
import { UserService } from "../../services/user/userService";

export default function UserPage() {
    const sessionStorageService = new SessionStorageService();
    const roleService = new RoleService();
    const userService = new UserService();
    const { updateLoading, updateNotification } = useContext(GlobalContext);
    const {
        selectedUserId,
        isShowAddUserDialog,
        isShowUpdateUserDialog,
        isShowDeleteUserDialog,
        updateRoles,
        updateIsShowAddUserDialog,
        updateIsShowDeleteUserDialog,
        updateIsCompletedDeleteUser,
    } = useContext(UserContext);

    const showAddUserDialog = () => {
        updateIsShowAddUserDialog(true);
    };

    const fetchRoles = async () => {
        updateLoading(true);
        let roles: Role[] = await roleService.getAllRoles();
        if (sessionStorageService.isAdmin()) {
            if (!sessionStorageService.isSuperAdmin()) {
                roles = roles.filter((r) => r.roleName !== RoleEnum.SUPERADMIN);
            }
        } else {
            roles = roles.filter(
                (r) =>
                    ![RoleEnum.ADMIN, RoleEnum.SUPERADMIN].includes(
                        r.roleName as RoleEnum
                    )
            );
        }
        updateRoles(roles);
        updateLoading(false);
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleCloseConfirmDialog = (): void => {
        updateIsShowDeleteUserDialog(false);
    };

    const handleAcceptConfirmDialog = async (): Promise<void> => {
        if (selectedUserId) {
            updateLoading(true);
            await userService.deleteUserById(selectedUserId);
            updateIsCompletedDeleteUser(true);
            updateLoading(false);
            updateNotification({
                status: "success",
                message: "Deleted user successfully",
            });
        }
        updateIsShowDeleteUserDialog(false);
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
            {isShowDeleteUserDialog && (
                <ConfirmDialog
                    isShow={isShowDeleteUserDialog}
                    message="Are you sure you want to delete this user?"
                    handleClose={handleCloseConfirmDialog}
                    handleConfirm={handleAcceptConfirmDialog}
                />
            )}
        </Container>
    );
}
