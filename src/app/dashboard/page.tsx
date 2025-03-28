"use client";
import DataTable from "@/ui/DataTable";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

export default function DashboardPage() {
  // Mock data - replace with your actual data fetching logic
  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "active",
      lastLogin: "2023-05-15T10:30:00Z",
    },
    // Add more users...
  ];

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
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
    { header: "Last Login", accessor: "lastLogin" },
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
      <DataTable<User> data={users} columns={columns} itemsPerPage={5} />
    </div>
  );
}
