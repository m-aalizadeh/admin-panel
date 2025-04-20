import { User } from "../types/user";
import { useState, useEffect } from "react";
import { commonFetch, uploadFile } from "@/services/api";
import CameraModal from "./CameraModal";
import Avatar from "./Avatar";

type Props = {
  user: User;
};

function Navbar({ user }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const onCapture = async (imageData: string) => {
    setCapturedImage(imageData);
    await uploadFile(imageData, user.id);
  };

  const getPhoto = async () => {
    const result = await commonFetch("GET", `files/getFile/${user?.id}`);
    if (result.status === "success") {
      const uint8Array = new Uint8Array(result?.data?.data);
      const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
      const imageType = "image/jpeg";
      const dataUrl = `data:${imageType};base64,${base64String}`;
      setCapturedImage(dataUrl);
    }
  };

  const handleDialog = async () => {
    await getPhoto();
    setCapturedImage(null);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (user?.id && capturedImage === null) {
      getPhoto();
    }
  }, [user]);

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
            <Avatar src={capturedImage} alt="MA" onClick={handleDialog} />
          </div>
        </div>
        <CameraModal
          isOpen={isOpen}
          capturedImage={capturedImage}
          onCapture={onCapture}
          handleDialog={handleDialog}
        />
      </div>
    </header>
  );
}

export default Navbar;
