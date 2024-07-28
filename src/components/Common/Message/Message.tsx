import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";

export default function Message() {
    const { notification, updateNotification } = useContext(GlobalContext);

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        updateNotification({
            status: "success",
            message: "",
        });
    };

    return (
        <Snackbar
            open={notification.message.length > 0}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={notification.status}
                variant="filled"
                sx={{ width: "100%" }}
            >
                {notification.message}
            </Alert>
        </Snackbar>
    );
}
