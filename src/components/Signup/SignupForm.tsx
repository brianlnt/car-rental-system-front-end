import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthenticateService } from "../../services/authenticate/authenticateService";
import { CustomError } from "../../utils/customError";
import { Link, useNavigate } from "react-router-dom";
import "./SignupForm.css";
import { User } from "../../models/User";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
    phone: Yup.string()
        .required("Phone is required")
        .matches(/^\d{10}$/, "Phone number should be 10 digits"),
});

export default function SignupForm() {
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

    const onSubmit = async (data: {
        firstname: string;
        lastname: string;
        username: string;
        password: string;
        confirmPassword: string;
        email: string;
        phone: string;
    }): Promise<void> => {
        console.log("BAC");
        try {
            updateLoading(true);
            const user: User = {
                userId: 0,
                firstname: data.firstname,
                lastname: data.lastname,
                username: data.username,
                password: data.password,
                address: "",
                email: data.email,
                phone: data.phone,
                roles: [],
            };
            await authenticationService.signup(user);
            updateLoading(false);
            updateNotification({
                status: "success",
                message: "Signed user successfully",
            });
            navigate("/login");
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
                    Sign up
                </Typography>
            </div>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="firstname"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    label="First Name"
                                    placeholder="Enter your first name"
                                    error={errors.firstname ? true : false}
                                    helperText={errors.firstname?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="lastname"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                    error={errors.lastname ? true : false}
                                    helperText={errors.lastname?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    type="password"
                                    label="Password"
                                    placeholder="Enter your password"
                                    error={errors.password ? true : false}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    type="password"
                                    label="Confirm Password"
                                    placeholder="Enter your confirm password"
                                    error={
                                        errors.confirmPassword ? true : false
                                    }
                                    helperText={errors.confirmPassword?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    label="Email address"
                                    placeholder="Enter your email address"
                                    error={errors.email ? true : false}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    label="Phone Number"
                                    placeholder="Enter your phone number"
                                    error={errors.phone ? true : false}
                                    helperText={errors.phone?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="allowExtraEmails"
                                    value="allowExtraEmails"
                                    color="primary"
                                />
                            }
                            label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                    </Grid>
                </Grid>
            </div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                startIcon={<HowToRegIcon />}
                sx={{ mt: 3, mb: 2 }}
            >
                Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link to={"/login"}>Already have an account? Sign in</Link>
                </Grid>
            </Grid>
        </Box>
    );
}
