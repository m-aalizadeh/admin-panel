import { Dialog } from "@headlessui/react";
import CameraComponent from "./CameraComponent";

const CameraModal = ({
  isOpen,
  capturedImage,
  onCapture,
  handleDialog,
}: {
  isOpen: boolean;
  capturedImage: string | null;
  onCapture: (capturedImage: string) => void;
  handleDialog: () => void;
}) => {
  return (
    <Dialog open={isOpen} onClose={handleDialog} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Take Photo
            </Dialog.Title>
            <div className="space-y-4">
              <div className="flex flex-row gap-4 items-start">
                <div className="flex-1">
                  <CameraComponent onCapture={onCapture} />
                </div>
                {capturedImage && (
                  <div className="flex-1">
                    <img
                      src={capturedImage}
                      alt="Captured"
                      className="max-w-full h-auto rounded border border-gray-200"
                    />
                  </div>
                )}
              </div>
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
