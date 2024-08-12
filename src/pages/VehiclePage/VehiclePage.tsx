import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VehicleList from "../../components/Vehicle/VehicleList";
import AddVehicleDialog from "../../components/Vehicle/AddVehicleDialog";
import { VehicleContext } from "../../contexts/VehicleContext";
import { useContext } from "react";
import EditVehicleDialog from "../../components/Vehicle/EditVehicleDialog";
import ConfirmDialog from "../../components/Common/ConfirmDialog/ConfirmDialog";
import { GlobalContext } from "../../contexts/GlobalContext";
import { VehicleService } from "../../services/vehicle/vehicleService";

const VehiclePage: React.FC = () => {
    const vehicleService = new VehicleService();
    const { updateLoading, updateNotification } = useContext(GlobalContext);
    const {
        selectedVehicleId,
        isShowAddVehicleDialog,
        updateIsShowAddVehicleDialog,
        isShowUpdateVehicleDialog,
        isShowDeleteVehicleDialog,
        updateIsShowDeleteVehicleDialog,
        updateIsCompletedDeleteVehicle,
    } = useContext(VehicleContext);

    const showAddVehicleDialog = () => {
        updateIsShowAddVehicleDialog(true);
    };

    const handleCloseConfirmDialog = (): void => {
        updateIsShowDeleteVehicleDialog(false);
    };

    const handleAcceptConfirmDialog = async (): Promise<void> => {
        if (selectedVehicleId !== null) {
            updateLoading(true);
            await vehicleService.deleteVehicleById(selectedVehicleId);
            updateIsCompletedDeleteVehicle(true);
            updateLoading(false);
            updateNotification({
                status: "success",
                message: "Deleted user successfully",
            });
        }
        updateIsShowDeleteVehicleDialog(false);
    };

    return (
        <Container maxWidth="xl">
            <Card variant="outlined" sx={{ m: 2, p: 2 }}>
                <CardHeader
                    title="Vehicle Management"
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
                            onClick={showAddVehicleDialog}
                            startIcon={<AddIcon />}
                        >
                            Add
                        </Button>
                    </Box>
                    <VehicleList />
                </CardContent>
            </Card>
            {isShowAddVehicleDialog && <AddVehicleDialog />}
            {isShowUpdateVehicleDialog && <EditVehicleDialog />}
            {isShowDeleteVehicleDialog && (
                <ConfirmDialog
                    isShow={isShowDeleteVehicleDialog}
                    message="Are you sure you want to delete this vehicle?"
                    handleClose={handleCloseConfirmDialog}
                    handleConfirm={handleAcceptConfirmDialog}
                />
            )}
        </Container>
    );
};

export default VehiclePage;
