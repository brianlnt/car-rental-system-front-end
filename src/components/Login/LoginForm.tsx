import { Box, Button, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

export default function LoginForm() {
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
        >
            <div>
                <Typography
                    sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
                >
                    Login Form
                </Typography>
            </div>
            <div>
                <TextField
                    required
                    fullWidth
                    label="Username"
                    placeholder="Enter your username"
                    name="username"
                />
                <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
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
