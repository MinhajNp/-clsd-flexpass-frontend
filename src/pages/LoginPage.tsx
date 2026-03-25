import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { LoginDto } from "../types/auth.types";


const LoginPage = () => {
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const onSubmit = async (data: LoginDto) => {
    try {
      setError("");

      const res = await handleLogin(data);

      //  KEY LOGIC
      if (res.requiresOtp) {
        navigate("/otp", {
          state: { email: data.email },
        });
        return;
      }
      
      // ✅ direct login
    //  storing accessToken in localStorage
      if (res.accessToken) {
        navigate("/dashboard"); // placeholder
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Logging in...</p>}
      <LoginForm onSubmit={onSubmit} />
    </>
  );
};

export default LoginPage;