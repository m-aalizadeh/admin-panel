"use client";
import queryString from "query-string";
import { useState, useEffect } from "react";
import DataTable from "@/ui/DataTable";
import { commonFetch } from "@/services/api";
import ConfirmationDialog from "@/ui/ConfirmationDialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
interface User {
  name: string;
  email: string;
  username: string;
  _id: string;
  status: "active" | "inactive";
  phoneNumber: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchUsers = async (page: number = 0) => {
    const response = await commonFetch(
      "GET",
      "users/allUsers",
      queryString.stringify({ page, limit: 5 })
    );
    if (
      response?.users &&
      Array.isArray(response.users) &&
      response.users.length
    ) {
      setTotalCount(response.totalCount || users.length);
      setUsers(response.users);
    }
  };

  const handlePagination = async (page: number) => {
    await fetchUsers(page);
  };

  const deleteUser = async () => {
    const response = await commonFetch(
      "DELETE",
      `users/deleteUser/${selectedUser}`
    );
    if (response.status === "success") {
      toast.success(response.message, { duration: 2000 });
    } else {
      toast.error(response.message, { duration: 2000 });
    }
    setSelectedUser("");
    setIsDialogOpen(false);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Username", accessor: "username" },
    {
      header: "Status",
      accessor: "status",
      render: (value: string) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    { header: "Phone Number", accessor: "phoneNumber" },
    {
      header: "Modify User",
      accessor: "_id",
      render: (value: string, row: User) => {
        const id = row._id;
        return (
          <button
            className="text-blue-600 hover:text-blue-900"
            onClick={() => router.push(`/dashboard/${id}/editUser`)}
          >
            Edit
          </button>
        );
      },
    },
    {
      header: "Delete User",
      accessor: "_id",
      render: (value: string, row: User) => {
        return (
          <button
            className="text-blue-600 hover:text-blue-900"
            onClick={() => {
              if (user?.role !== "admin") {
                toast.error("Only admin users are able do this action", {
                  duration: 2000,
                });
                return;
              }
              setSelectedUser(row._id);
              setIsDialogOpen(true);
            }}
          >
            Delete
          </button>
        );
      },
    },
  ] satisfies {
    header: string;
    accessor: keyof User;
    render?: (value: any, row: User) => React.ReactNode;
  }[];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <DataTable
        data={users}
        columns={columns}
        itemsPerPage={5}
        totalCount={totalCount}
        handlePagination={handlePagination}
      />
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={deleteUser}
        onCancel={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
