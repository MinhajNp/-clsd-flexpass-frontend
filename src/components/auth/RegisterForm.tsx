import { useState } from "react";

type Props = {
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
  }) => void;
};

const RegisterForm = ({ onSubmit }: Props) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required";

    if (!/^\S+@\S+\.\S+$/.test(form.email))
      return "Invalid email format";

    if (form.password.length < 6)
      return "Password must be at least 6 characters";

    if (form.password !== form.confirmPassword)
      return "Passwords do not match";

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

    // only send required fields
    onSubmit({
      name: form.name,
      email: form.email,
      password: form.password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={(e) =>
          handleChange("confirmPassword", e.target.value)
        }
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;