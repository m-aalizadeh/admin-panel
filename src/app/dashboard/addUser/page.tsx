"use client";
import { Users } from "@/types/user";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RHFTextField from "@/ui/RHFTextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { commonFetch } from "@/services/api";
import toast from "react-hot-toast";

const schema = yup
  .object({
    name: yup
      .string()
      .min(4, "Username must be at least five characters")
      .max(30)
      .required("Username is required"),
    email: yup
      .string()
      .email("The email is not valid")
      .required("The email is required"),
    username: yup
      .string()
      .min(5, "Username must be at least five characters")
      .max(25)
      .required("Username is required"),
    status: yup.string().required("Status is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  })
  .required();

function AddUser() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onTouched" });
  const [loader, setLoader] = useState(false);

  const onSubmit = async (values: Users) => {
    setLoader(true);
    const response = await commonFetch(
      "POST",
      "users/addUser",
      undefined,
      values
    );
    if (response?.newUser) {
      toast.success("User Created Successfully", { duration: 2000 });
    } else {
      const { message = "User creation got failed!", validationErrors } =
        response;
      const errorMessage = validationErrors?.[0]?.msg || message;
      toast.error(errorMessage);
    }
    setLoader(false);
    router.push("/dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New User</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RHFTextField
            label="Name"
            name="name"
            register={register}
            isRequired
            errors={errors}
          />
          <RHFTextField
            label="Username"
            name="username"
            register={register}
            isRequired
            errors={errors}
          />
          <RHFTextField
            label="Email"
            name="email"
            register={register}
            isRequired
            errors={errors}
          />
          <RHFTextField
            label="Phone Number"
            name="phoneNumber"
            register={register}
            isRequired
            errors={errors}
          />
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="status"
            >
              Status
            </label>
            <select
              id="status"
              {...register("status")}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loader}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loader ? "Adding..." : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
