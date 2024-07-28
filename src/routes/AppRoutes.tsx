import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import UserPage from "../pages/UserPage/UserPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AuthorizedLayout from "../layouts/AuthorizedLayout/AuthorizedLayout";
import UnauthorizedLayout from "../layouts/UnauthorizedLayout/UnauthorizedLayout";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import VehiclePage from "../pages/VehiclePage/VehiclePage";
import { LocalStorageService } from "../services/localStorageService";
import { DashboardsContextComp } from "../contexts/DashboardContext";
import { UsersContextComp } from "../contexts/UserContext";
import { VehiclesContextComp } from "../contexts/VehicleContext";
import { LoginContextComp } from "../contexts/LoginContext";

export default function AppRoutes() {
    const localStorageService = new LocalStorageService();
    const isAuthenticated: boolean = localStorageService.isAuthenticated();

    return (
        <BrowserRouter>
            {isAuthenticated ? (
                <AuthorizedLayout>
                    <Routes>
                        <Route element={<DashboardsContextComp />}>
                            <Route path="/" element={<DashboardPage />} />
                            <Route
                                path="/dashboards"
                                element={<DashboardPage />}
                            />
                        </Route>
                        <Route element={<UsersContextComp />}>
                            <Route path="/users" element={<UserPage />} />
                        </Route>
                        <Route element={<VehiclesContextComp />}>
                            {" "}
                            <Route path="/vehicles" element={<VehiclePage />} />
                        </Route>
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </AuthorizedLayout>
            ) : (
                <LoginContextComp>
                    <UnauthorizedLayout>
                        <Routes>
                            <Route path="/*" element={<LoginPage />} />
                            <Route path="/login" element={<LoginPage />} />
                        </Routes>
                    </UnauthorizedLayout>
                </LoginContextComp>
            )}
        </BrowserRouter>
    );
}
