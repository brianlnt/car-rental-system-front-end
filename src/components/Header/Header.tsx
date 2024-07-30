import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { LocalStorageService } from "../../services/localStorageService";

type Page = {
    id: number;
    name: string;
    path: string;
};

export default function Header() {
    const localStorageService = new LocalStorageService();
    const isAdmin: boolean = localStorageService.isAdmin();

    let pages: Page[] = [{ id: 4, name: "Rentals", path: "/rentals" }];
    if (isAdmin) {
        pages = [
            { id: 1, name: "Dashboards", path: "/dashboards" },
            { id: 2, name: "Users", path: "/users" },
            { id: 3, name: "Vehicles", path: "/vehicles" },
        ];
    }

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="sticky" sx={{ top: 0, zIndex: 9999 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <DirectionsCarIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        CRS
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    component={Link}
                                    key={`xs-${page.id}`}
                                    onClick={handleCloseNavMenu}
                                    to={page.path}
                                >
                                    <Typography textAlign="center">
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <DirectionsCarIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        CRS
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                component={Link}
                                key={`md-${page.id}`}
                                onClick={handleCloseNavMenu}
                                to={page.path}
                                sx={{
                                    my: 2,
                                    color: "white",
                                    display: "block",
                                }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
