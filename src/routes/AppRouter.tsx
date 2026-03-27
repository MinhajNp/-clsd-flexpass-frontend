import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ForgotPasswordPage from "../modules/auth/pages/ForgotPasswordPage";
import PublicRoute from "./PublicRoute";
import AuthPage from "../modules/auth/pages/AuthPage";
import OtpPage from "../modules/auth/pages/OtpPage";
import ProtectedRoute from "./ProtectdRoute";
import UserDashboard from "../modules/user/pages/UserDashboard";
import UserManagementPage from "../modules/admin/pages/UserManagementPage";
import ResetPasswordPage from "../modules/auth/pages/ResetPasswordPage";



const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}

                {/* Unified auth page (login + sign-up) */}
                <Route
                    path="/auth"
                    element={
                        <PublicRoute>
                            <AuthPage />
                        </PublicRoute>
                    }
                />
                {/* Legacy redirects so old links still work */}
                <Route path="/login"    element={<Navigate to="/auth" replace />} />
                <Route path="/register" element={<Navigate to="/auth" replace />} />

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
                            <UserDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute>
                            <UserManagementPage />
                        </ProtectedRoute>
                    }
                />

                <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
                <Route path="/reset-password"  element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />

                {/* Default: send root to /auth */}
                <Route path="/" element={<Navigate to="/auth" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;