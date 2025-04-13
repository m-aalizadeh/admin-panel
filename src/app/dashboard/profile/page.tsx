"use client";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-500">
                  Username
                </h2>
                <p className="text-xl">{user?.username}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-500">Email</h2>
                <p className="text-xl">{user?.email}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-500">Role</h2>
                <p className="text-xl capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
