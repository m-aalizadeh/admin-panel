import { commonFetch } from "./api";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

type AuthParams = {
  endpoint: string;
  values: any;
  router: ReturnType<typeof useRouter>;
  redirectPath: string;
};

type AuthReturn = { user: User | null; message: string };

export async function handleAuth({
  endpoint,
  values,
  router,
  redirectPath,
}: AuthParams): Promise<AuthReturn> {
  try {
    const response = await commonFetch("POST", endpoint, undefined, values);
    if (response?.token) {
      const { data = {}, token, message } = response;
      const { email, _id, username, role } = data;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem(
        "user",
        JSON.stringify({ email, userId: _id, username, role })
      );
      router.push(redirectPath);
      return { user: { email, id: _id, username, role }, message };
    } else {
      const message =
        response?.validationErrors?.[0]?.msg ||
        response?.message ||
        "Authentication failed";
      return { message, user: null };
    }
  } catch (error) {
    console.log(error);
    return { message: "An unexpected error occurred", user: null };
  }
}
