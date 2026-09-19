import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ForgotPasswordPage from "../modules/auth/pages/ForgotPasswordPage";
import PublicRoute from "./PublicRoute";
import AuthPage from "../modules/auth/pages/AuthPage";
import OtpPage from "../modules/auth/pages/OtpPage";
import ProtectedRoute from "./ProtectedRoute";
import UserDashboard from "../modules/user/pages/UserDashboard";
import UserManagementPage from "../modules/admin/pages/UserManagementPage";
import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import GymManagementPage from "../modules/admin/pages/GymManagementPage";
import ResetPasswordPage from "../modules/auth/pages/ResetPasswordPage";
import LandingPage from "../modules/auth/pages/LandingPage";
import GymApplicationPage from "../modules/gym/pages/GymApplicationPage";
import ApplicationList from "../modules/admin/pages/ApplicationList";
import ApplicationDetail from "../modules/admin/pages/ApplicationDetail";
import { AuthLayout } from "../modules/auth/components/AuthLayout";
import RegistrationCompletion from "../modules/gym/pages/RegistrationCompletion";
import GymAdminLayout from "../modules/gym-admin/components/GymAdminLayout";
import GymAdminDashboard from "../modules/gym-admin/pages/GymAdminDashboard";
import PendingApprovalPage from "../modules/gym/pages/PendingApprovalPage";

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
                    <Route path="/complete-registration" element={<RegistrationCompletion />} />

                    {/* Protected User Dashboard */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={["USER", "PLATFORM_ADMIN"]}>
                                <UserDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Platform Admin Routes */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute allowedRoles={["PLATFORM_ADMIN"]}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/gyms"
                        element={
                            <ProtectedRoute allowedRoles={["PLATFORM_ADMIN"]}>
                                <GymManagementPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/users"
                        element={
                            <ProtectedRoute allowedRoles={["PLATFORM_ADMIN"]}>
                                <UserManagementPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/applications"
                        element={
                            <ProtectedRoute allowedRoles={["PLATFORM_ADMIN"]}>
                                <ApplicationList />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/applications/:id"
                        element={
                            <ProtectedRoute allowedRoles={["PLATFORM_ADMIN"]}>
                                <ApplicationDetail />
                            </ProtectedRoute>
                        }
                    />

                    {/* Gym Admin Portal */}
                    <Route 
                        path="/gym-admin" 
                        element={
                            <ProtectedRoute allowedRoles={["GYM_ADMIN"]}>
                                <GymAdminLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<GymAdminDashboard />} />
                        <Route path="check-ins" element={<div className="p-8">Check-ins Page (Coming Soon)</div>} />
                        <Route path="slots" element={<div className="p-8">Slot Management Page (Coming Soon)</div>} />
                        <Route path="trainers" element={<div className="p-8">Trainers Page (Coming Soon)</div>} />
                        <Route path="bookings" element={<div className="p-8">Bookings Page (Coming Soon)</div>} />
                        <Route path="earnings" element={<div className="p-8">Earnings Page (Coming Soon)</div>} />
                        <Route path="reviews" element={<div className="p-8">Reviews Page (Coming Soon)</div>} />
                        <Route path="settings" element={<div className="p-8">Settings Page (Coming Soon)</div>} />
                    </Route>

                    <Route path="/gym/pending-approval" element={<PendingApprovalPage />} />

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