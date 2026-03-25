import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { handleForgotPassword, loading } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await handleForgotPassword(email);

      navigate("/reset-password", {
        state: { email },
      });
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div >
      <div>

        <h2 className="text-lg font-semibold mb-4">
          Forgot Password
        </h2>

        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={submit}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;