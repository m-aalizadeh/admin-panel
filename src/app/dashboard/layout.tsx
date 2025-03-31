"use client";
import { ReactNode } from "react";
import Head from "next/head";
import Navbar from "@/ui/Navbar";
import Sidebar from "@/ui/Sidebar";
import { useAuth } from "@/context/AuthContext";

type DashboardProps = {
  children: ReactNode;
  title?: string;
};

function DashboardLayout({ children, title = "Dashboard" }: DashboardProps) {
  const { user } = useAuth();
  return (
    <div>
      <Head>{title}</Head>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar user={user} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 md:ml-64">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
