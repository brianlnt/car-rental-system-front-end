import { Box, Button, Card, CardContent, CardHeader, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VehicleList from "../../components/Vehicle/VehicleList";
import AddVehicleDialog from "../../components/Vehicle/AddVehicleDialog";
import { VehicleContext } from "../../contexts/VehicleContext";
import { useContext } from "react";
import EditVehicleDialog from "../../components/Vehicle/EditVehicleDialog";
import DeleteVehicleDialog from "../../components/Vehicle/DeleteVehicleDialog";

const VehiclePage: React.FC = () => {

    const {
        isShowAddVehicleDialog,
        updateIsShowAddVehicleDialog,
        isShowUpdateVehicleDialog,
        isShowDeleteVehicleDialog
    } = useContext(VehicleContext);

    const showAddVehicleDialog = () => {
        updateIsShowAddVehicleDialog(true);
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
            {isShowDeleteVehicleDialog && <DeleteVehicleDialog />}
        </Container>
  );
};

export default VehiclePage;
