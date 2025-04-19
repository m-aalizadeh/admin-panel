import { SignedUser } from "../types/user";
import { useState, useEffect } from "react";
import { commonFetch } from "@/services/api";
import CameraModal from "./CameraModal";
import Avatar from "./Avatar";

type Props = {
  user: SignedUser | null;
};

function Navbar({ user }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>();

  const handleDialog = () => {
    setIsOpen(!isOpen);
  };

  const getPhoto = async () => {
    const result = await commonFetch(
      "GET",
      `files/getFile/67fd2df85f55feea48bea1eb`
    );
    if (result.status === "success") {
      const uint8Array = new Uint8Array(result?.data?.data);
      const base64String = btoa(
        String.fromCharCode.apply(null, result?.data?.data)
      );
      const imageType = "image/jpeg";
      const dataUrl = `data:${imageType};base64,${base64String}`;
      setImage(dataUrl);
    }
  };

  useEffect(() => {
    getPhoto();
  }, []);

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4 ml-64">
        <div className="flex items-center">
          <button className="p-1 mr-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none md:hidden">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar
              src={image}
              alt="MA"
              onClick={handleDialog}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload
            </Avatar>
          </div>
        </div>
        <CameraModal isOpen={isOpen} handleDialog={handleDialog} />
      </div>
    </header>
  );
}

export default Navbar;
