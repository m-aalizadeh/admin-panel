"use client";
import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { User } from "../../../types/user";

const schema = yup
  .object({
    username: yup
      .string()
      .min(5, "Name must be at least five characters")
      .max(30)
      .required("Name is required"),
    email: yup
      .string()
      .email("The email is not valid")
      .required("The email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({ resolver: yupResolver(schema), mode: "onTouched" });
  const router = useRouter();

  const onSubmit = async (values: User) => {
    const data = await fetch("http://localhost:8000/api/v1/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        pragma: "no-cache",
        "cache-control": "no-cache",
      },
      body: JSON.stringify(values),
    });
    const user = await data.json();
    if (user?.token) {
      const { data = {}, token } = user;
      const { email, _id, username } = data;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem(
        "user",
        JSON.stringify({ email, userId: _id, username })
      );
      router.push("/panel");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-secondary-500 text-center ">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <RHFTextField
          label="Username"
          name="username"
          register={register}
          isRequired
          errors={errors}
        />
        <RHFTextField
          label="email"
          name="email"
          register={register}
          isRequired
          errors={errors}
        />
        <RHFTextField
          label="Password"
          name="password"
          type="password"
          register={register}
          isRequired
          errors={errors}
        />
        <div>
          {isLoading ? (
            <div className="spinner-mini"></div>
          ) : (
            <Button className="w-full bg-blue-500 text-white p-2 rounded">
              Sign Up
            </Button>
          )}
        </div>
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={() => router.push("/signin")}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Signup;
