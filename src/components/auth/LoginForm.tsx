import { useState } from "react";
import type { LoginDto } from "../../types/auth.types";
import { useNavigate } from "react-router-dom";


type Props = {
  onSubmit: (data: LoginDto) => void;
};


const LoginForm = ({ onSubmit }: Props) => {
  const navigate = useNavigate()
  const [form, setForm] = useState<LoginDto>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

 const validate = () => {
  const email = form.email.trim();
  const password = form.password.trim();

  if (!email) return "Email is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Enter a valid email";

  if (!password) return "Password is required";
  if (password.length < 6) return "Wrong Password";

  return "";
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onSubmit(form);
  };

  return (
    <div
    className="text-center">
    <form onSubmit={handleSubmit}>
      <input
      className="inline-block"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Login</button>
      
    </form>

        <button
           type="button"
          onClick={() => navigate("/forgot-password")}>
            Forgot Password?
        </button>
    </div>


  );
};

export default LoginForm;