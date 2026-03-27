import { useAdmin } from "../hooks/useAdmin";
import Table from "../../../components/ui/Table";
import type { User } from "../../auth/types/auth.types";

const UserManagementPage = () => {
  const { users, loading, toggleStatus } = useAdmin();

  const columns = [
    { header: "Name",   accessor: "name" },
    { header: "Email",  accessor: "email" },
    { header: "Status", accessor: "status" },
  ];

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Users</h2>

      <Table
        data={users as unknown as Record<string, unknown>[]}
        columns={columns}
        renderActions={(row) => {
          const user = row as unknown as User;
          return (
            <button onClick={() => toggleStatus(user.id, user.status)}>
              {user.status === "ACTIVE" ? "Block" : "Unblock"}
            </button>
          );
        }}
      />
    </div>
  );
};

export default UserManagementPage;
