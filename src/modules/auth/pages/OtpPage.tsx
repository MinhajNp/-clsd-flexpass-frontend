import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

type LocationState = {
  email: string;
};

const OtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState;
  const email = state?.email;

  const { handleVerifyOtp, loading } = useAuth();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  if (!email) {
    return <p>Invalid access. Please register again.</p>;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError("");
      await handleVerifyOtp({ email, otp });
      navigate("/auth");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "OTP verification failed";
      setError(message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Enter OTP sent to {email}</h3>

      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Verifying...</p>}

      <button type="submit">Verify OTP</button>
    </form>
  );
};

export default OtpPage;
