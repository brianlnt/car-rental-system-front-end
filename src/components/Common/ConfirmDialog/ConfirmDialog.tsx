import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

export default function ConfirmDialog({
    isShow,
    message,
    handleClose,
    handleConfirm,
}: {
    isShow: boolean;
    message: string;
    handleClose: () => void;
    handleConfirm: () => {};
}) {
    return (
        <Dialog
            open={isShow}
            onClose={handleClose}
            aria-labelledby="confirm-dialog"
            aria-describedby="confirm-dialog-description"
        >
            <DialogTitle id="confirm-dialog">{"Confirm Deletion"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="confirm-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
