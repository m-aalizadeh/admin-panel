// services/auth.ts
import { commonFetch } from "./api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type AuthParams = {
  endpoint: string;
  values: any;
  router: ReturnType<typeof useRouter>;
  redirectPath: string;
};

export async function handleAuth({
  endpoint,
  values,
  router,
  redirectPath,
}: AuthParams): Promise<boolean> {
  try {
    const response = await commonFetch("POST", endpoint, undefined, values);
    if (response?.token) {
      const { data = {}, token, message } = response;
      toast.success(message, { duration: 2000 });
      const { email, _id, username } = data;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem(
        "user",
        JSON.stringify({ email, userId: _id, username })
      );
      router.push(redirectPath);
      return true;
    } else {
      const errorMessage =
        response?.validationErrors?.[0]?.msg ||
        response?.message ||
        "Authentication failed";
      toast.error(errorMessage);
      return false;
    }
  } catch (error) {
    toast.error("An unexpected error occurred");
    return false;
  }
}
