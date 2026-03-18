import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default DashboardPage;