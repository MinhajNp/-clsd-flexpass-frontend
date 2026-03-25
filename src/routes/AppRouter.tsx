import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import OtpPage from "../pages/OtpPage";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "./ProtectdRoute";
import PublicRoute from "./PublicRoute";
import AdminUsersPage from "../pages/AdminUsersPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";


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

                <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
                <Route path="/reset-password" element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;