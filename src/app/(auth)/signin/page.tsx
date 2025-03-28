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
import { handleAuth } from "../../../services/auth";

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onTouched" });
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: SignedUser) => {
    setLoader(true);
    await handleAuth({
      endpoint: "user/signin",
      values,
      router,
      redirectPath: "/dashboard",
    });
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
            {loader ? (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              "Sign In"
            )}
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
