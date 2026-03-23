import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import OtpPage from "../pages/OtpPage";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "./ProtectdRoute";
import PublicRoute from "./PublicRoute";
import AdminUsersPage from "../pages/AdminUsersPage";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <RegisterPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/otp"
                    element={
                        <PublicRoute>
                            <OtpPage />
                        </PublicRoute>
                    }
                />

                {/* Protected */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute>
                            <AdminUsersPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;