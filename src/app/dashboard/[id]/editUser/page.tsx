"use client";
import { UserForm } from "@/ui/UserForm";
import { commonFetch } from "@/services/api";
import { usePathname } from "next/navigation";
import { Users } from "@/types/user";
import { useState, useEffect } from "react";

export default function EditUserPage() {
  const userId = usePathname().split("/")[2];
  const [initialValues, setInitialValues] = useState<Partial<Users> | null>(
    null
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await commonFetch("GET", `users/getUser/${userId}`);
        setInitialValues(response.user);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, [userId]);

  if (!initialValues) return <div>Loading...</div>;

  return <UserForm initialValues={initialValues} isEdit userId={userId} />;
}
