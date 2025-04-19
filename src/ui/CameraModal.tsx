import { useState } from "react";
import { Dialog } from "@headlessui/react";
import CameraComponent from "./CameraComponent";
import { uploadFile } from "@/services/api";

const CameraModal = ({
  isOpen,
  handleDialog,
}: {
  isOpen: boolean;
  handleDialog: () => void;
}) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const onCapture = async (imageData: string) => {
    setCapturedImage(imageData);
    await uploadFile(imageData);
  };
  return (
    <Dialog open={isOpen} onClose={handleDialog} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Take Photo
            </Dialog.Title>
            <div className="space-y-4">
              <CameraComponent onCapture={onCapture} />
              {capturedImage && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Captured Image:</h4>
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="max-w-full h-auto rounded border border-gray-200"
                  />
                </div>
              )}
              <div className="flex justify-end">
                <button
                  onClick={handleDialog}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default CameraModal;
