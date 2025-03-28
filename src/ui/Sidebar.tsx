"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiHome, FiLogOut, FiUser } from "react-icons/fi";

import React from "react";

function Sidebar() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const sideItems = [
    {
      id: "dashboard",
      path: "/dashboard",
      name: "Dashboard",
      icon: <FiHome size={20} />,
    },
    {
      id: "profile",
      path: "/dashboard/profile",
      name: "Profile",
      icon: <FiUser size={20} />,
    },
    {
      id: "logOut",
      path: "/",
      name: "Log Out",
      icon: <FiLogOut size={20} />,
    },
  ];

  const handleLogOut = () => {
    setIsLoggingOut(true);

    // Clear client storage
    localStorage.clear();

    // Redirect
    router.push("/");
    setIsLoggingOut(false);
  };
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-lg fixed inset-y-0 left-0 z-30">
      <div className="flex items-center justify-center h-16 px-4 bg-indigo-600 text-white">
        <span className="text-xl font-semibold">Admin Panel</span>
      </div>
      <nav className="p-4 h-[calc(100vh-4rem)] overflow-y-auto sidebar-scroll">
        <ul className="space-y-2">
          {sideItems.map((item) => (
            <li key={item.id}>
              {item.id !== "logOut" ? (
                <Link legacyBehavior href={item.path}>
                  <a
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      pathname === item.path
                        ? "bg-indigo-50 text-indigo-600 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span
                      className={`mr-3 ${
                        pathname === item.path
                          ? "text-indigo-500"
                          : "text-gray-500"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </a>
                </Link>
              ) : (
                <Link
                  href="/"
                  onClick={handleLogOut}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                    isLoggingOut ? "bg-gray-100" : "hover:bg-gray-100"
                  }`}
                >
                  <FiLogOut
                    className={`w-5 h-5 ${isLoggingOut ? "animate-spin" : ""}`}
                  />
                  <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
