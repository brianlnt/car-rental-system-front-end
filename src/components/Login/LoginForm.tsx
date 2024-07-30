import { Box, Button, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthenticateService } from "../../services/authenticate/authenticateService";
import { CustomError } from "../../utils/customError";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

export default function LoginForm() {
    const navigate = useNavigate();
    const authenticationService = new AuthenticateService();
    const { updateLoading, updateNotification } = useContext(GlobalContext);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: { username: string; password: string }) => {
        try {
            updateLoading(true);
            await authenticationService.authenticate(
                data.username,
                data.password
            );
            updateLoading(false);
            window.location.href = "/dashboards";
        } catch (error) {
            updateLoading(false);
            updateNotification({
                status: "error",
                message:
                    error instanceof CustomError
                        ? error.message
                        : "Unknow message",
            });
        }
    };

    return (
        <Box
            component="form"
            sx={{
                "& .MuiTextField-root": {
                    mt: 1,
                    mb: 1,
                    width: "100%",
                },
                Button: { mt: 1 },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div>
                <Typography
                    sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
                >
                    Login Form
                </Typography>
            </div>
            <div>
                <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            required
                            fullWidth
                            label="Username"
                            placeholder="Enter your username"
                            error={errors.username ? true : false}
                            helperText={errors.username?.message}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            error={errors.password ? true : false}
                            helperText={errors.password?.message}
                        />
                    )}
                />
            </div>
            <div>
                <Box sx={{ float: "right", mt: 1 }}>
                    <Button
                        variant="contained"
                        startIcon={<LoginIcon />}
                        type="submit"
                    >
                        Login
                    </Button>
                </Box>
            </div>
        </Box>
    );
}
