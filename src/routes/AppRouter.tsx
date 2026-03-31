import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ForgotPasswordPage from "../modules/auth/pages/ForgotPasswordPage";
import PublicRoute from "./PublicRoute";
import AuthPage from "../modules/auth/pages/AuthPage";
import OtpPage from "../modules/auth/pages/OtpPage";
import ProtectedRoute from "./ProtectdRoute";
import UserDashboard from "../modules/user/pages/UserDashboard";
import UserManagementPage from "../modules/admin/pages/UserManagementPage";
import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import ResetPasswordPage from "../modules/auth/pages/ResetPasswordPage";
import LandingPage from "../modules/auth/pages/LandingPage";
import GymApplicationPage from "../modules/gym/pages/GymApplicationPage";
import { AuthLayout } from "../modules/auth/components/AuthLayout";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <AuthLayout>
                <Routes>
                    {/* Public */}
                    <Route
                        path="/auth"
                        element={
                            <PublicRoute>
                                <AuthPage />
                            </PublicRoute>
                        }
                    />
                    {/* Legacy redirects */}
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

                    <Route path="/partner/apply" element={<GymApplicationPage />} />

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
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
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

                    {/* Default: Landing Page for both Unregistered and Registered without membership */}
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </AuthLayout>
        </BrowserRouter>
    );
};

export default AppRouter;