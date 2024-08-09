import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { VehicleContext } from "../../contexts/VehicleContext";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { VehicleService } from "../../services/vehicle/vehicleService";

export default function DeleteVehicleDialog () {
    const {updateIsCompletedDeleteVehicle, updateIsShowDeleteVehicleDialog, isShowDeleteVehicleDialog, selectedVehicleId} = useContext(VehicleContext);
    const {updateLoading} = useContext(GlobalContext);
    const vehicleService = new VehicleService();

    const handleDelete = async (vehicleId: number) => {
        updateLoading(true);
        await vehicleService.deleteVehicleById(vehicleId);
        updateIsCompletedDeleteVehicle(true);
        updateLoading(false);
    };
    
    const handleConfirm = () => {
        if (selectedVehicleId !== null) {
            handleDelete(selectedVehicleId);
        }
        updateIsShowDeleteVehicleDialog(false);
    }

    return (
        <Dialog
            open={isShowDeleteVehicleDialog}
            onClose={() => updateIsShowDeleteVehicleDialog(false)}
            aria-labelledby="confirm-dialog"
            aria-describedby="confirm-dialog-description"
        >
        <DialogTitle id="confirm-dialog">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="confirm-dialog-description">
                Are you sure you want to delete this vehicle?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => updateIsShowDeleteVehicleDialog(false)} color="primary">
                Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
                Confirm
            </Button>
        </DialogActions>
    </Dialog>
    );
}