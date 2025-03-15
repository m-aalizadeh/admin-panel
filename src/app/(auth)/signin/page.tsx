"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import Loader from "@/ui/Loader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignedUser } from "../../../types/user";
import toast from "react-hot-toast";

const schema = yup
  .object({
    username: yup.string().required("Name is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({ resolver: yupResolver(schema), mode: "onTouched" });
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: SignedUser) => {
    setLoader(true);
    const data = await fetch("http://localhost:8000/api/v1/user/signin", {
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
      const { data = {}, token, message } = user;
      toast.success(message, {
        duration: 2000,
      });
      const { email, _id, username } = data;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem(
        "user",
        JSON.stringify({ email, userId: _id, username })
      );
      router.push("/panel");
    } else {
      const validationError = user?.validationErrors?.[0]?.msg || user?.message;
      toast.error(validationError);
    }
    setLoader(false);
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-secondary-500 text-center mb-6">
        Sign In
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        <RHFTextField
          label="Username"
          name="username"
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
          <Button
            disabled={loader}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {loader ? <Loader /> : "Sign In"}
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">Don't have an account?</p>
        <button
          onClick={() => router.push("/signup")}
          className="w-full mt-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Signin;
