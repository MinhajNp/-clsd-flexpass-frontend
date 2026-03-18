import RegisterForm from "../components/auth/RegisterForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { RegisterDto } from "../types/auth.types";

const RegisterPage = () => {
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const onSubmit = async (data: RegisterDto) => {
    try {
      setError("");

      await handleRegister(data);

      navigate("/otp", {
        state: { email: data.email },
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}
      <RegisterForm onSubmit={onSubmit} />
    </>
  );
};

export default RegisterPage;