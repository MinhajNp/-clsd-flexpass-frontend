import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";

const DashboardPage = () => {
  const { handleLogout } = useAuth();
  const { fetchUsers } = useUsers();
  const navigate = useNavigate();

  const logout = async () => {
    await handleLogout();
    navigate("/login");
  };

  const usersList = async () => {
    await fetchUsers();
    navigate("/admin/users")
  }

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={usersList}>Users</button>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default DashboardPage;