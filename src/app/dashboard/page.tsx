"use client";
import { useState, useEffect } from "react";
import DataTable from "@/ui/DataTable";
import { commonFetch } from "@/services/api";

interface User {
  name: string;
  email: string;
  username: string;
  id: string;
  status: "active" | "inactive";
  phoneNumber: string;
}

export default function DashboardPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await commonFetch("GET", "users/allUsers");
    if (
      response?.users &&
      Array.isArray(response.users) &&
      response.users.length
    ) {
      setUsers(response.users);
    }
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
      header: "Actions",
      accessor: "id",
      render: (value: string) => (
        <button className="text-blue-600 hover:text-blue-900">Edit</button>
      ),
    },
  ] satisfies {
    header: string;
    accessor: keyof User;
    render?: (value: any, row: User) => React.ReactNode;
  }[];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <DataTable data={users} columns={columns} itemsPerPage={5} />
    </div>
  );
}
