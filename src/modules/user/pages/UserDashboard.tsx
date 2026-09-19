import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await handleLogout();
    navigate("/auth");
  };


  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default UserDashboard;
