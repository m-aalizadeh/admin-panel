"use client";
import { useRouter } from "next/navigation";
import { createContext, useReducer, useContext } from "react";
import { User, SignedUser } from "../types/user";
import { handleAuth } from "@/services/auth";
import { commonFetch } from "@/services/api";
import toast from "react-hot-toast";

type AuthAction =
  | { type: "loading" }
  | { type: "rejected"; payload: string }
  | { type: "signin"; payload: User }
  | { type: "signup"; payload: User }
  | { type: "logout" };

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signin: (values: any) => Promise<void>;
  signup: (values: any) => Promise<void>;
  logout: () => void;
};
type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "rejected": {
      return { ...state, isLoading: false, error: action.payload };
    }
    case "signin":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "signup":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    default:
      throw new Error("Unknown action!");
  }
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [{ user, isAuthenticated, isLoading, error }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  async function signin(values: SignedUser) {
    dispatch({ type: "loading" });
    try {
      const response = await commonFetch(
        "POST",
        "user/signin",
        undefined,
        values
      );
      const { data = {}, token, message } = response;
      const { email, _id, username, role } = data;
      localStorage.setItem("token", JSON.stringify(token));
      dispatch({ type: "signin", payload: { email, id: _id, username, role } });
      toast.success(message);
      router.push("/dashboard");
    } catch (err: any) {
      const message =
        err?.response?.validationErrors?.[0]?.msg ||
        err?.response?.message ||
        "Authentication failed";
      dispatch({ type: "rejected", payload: message });
      toast.error(err.message);
    }
  }

  async function signup(values: User) {
    dispatch({ type: "loading" });
    try {
      const response = await commonFetch(
        "POST",
        "user/signup",
        undefined,
        values
      );
      const { data = {}, token, message } = response;
      const { email, _id, username, role } = data;
      localStorage.setItem("token", JSON.stringify(token));
      dispatch({ type: "signup", payload: { email, id: _id, username, role } });
      toast.success(message);
      router.push("/dashboard");
    } catch (err: any) {
      const message =
        err?.response?.validationErrors?.[0]?.msg ||
        err?.response?.message ||
        "Authentication failed";
      dispatch({ type: "rejected", payload: message });
      toast.error(err.message);
    }
  }

  function logout() {
    try {
      localStorage.clear();
      router.push("/");
      dispatch({ type: "logout" });
    } catch (err) {
      toast.error("Log out got failed!");
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, signin, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("not found Auth Context");
  return context;
}
