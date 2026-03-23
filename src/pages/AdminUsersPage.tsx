import { useUsers } from "../hooks/useUsers";
import DataTable from "../components/table/DataTable";

const AdminUsersPage = () => {
    
    const { users, loading, toggleStatus } = useUsers();

    const columns = [
        { header: "Name", accessor: "name" },
        { header: "Email", accessor: "email" },
        { header: "Status", accessor: "status" },
    ];

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Users</h2>

            <DataTable
                data={users}
                columns={columns}
                renderActions={(user) => (
                    <button onClick={() => toggleStatus(user.id, user.status)}>
                        {user.status === "ACTIVE" ? "Block" : "Unblock"}
                    </button>
                )}
            />
        </div>
    );
};

export default AdminUsersPage;