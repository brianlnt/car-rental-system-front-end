import { Backdrop, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";

export default function Loading() {
    const { loading } = useContext(GlobalContext);
    return (
        <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
