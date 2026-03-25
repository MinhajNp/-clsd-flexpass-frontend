import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const ResetPasswordPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { handleResetPassword, loading } = useAuth();

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      await handleResetPassword({
        email: state.email,
        otp,
        newPassword: password,
      });

      navigate("/auth");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div >

        <h2>
          Reset Password
        </h2>

        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;