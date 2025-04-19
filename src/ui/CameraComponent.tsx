import { useRef, useState, useEffect } from "react";

interface CameraComponentProps {
  onCapture?: (imageData: string) => void;
}

const CameraComponent = ({ onCapture }: CameraComponentProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setError(null);
    } catch (error) {
      setError("Could not access the camera. Please check permission");
      console.error("Camera error:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const toggleCamera = () => {
    stopCamera();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    startCamera();
  }, [facingMode]);

  const capturePhoto = () => {
    if (!videoRef.current || !stream || !photoRef.current) return;
    const video = videoRef.current;
    const canvas = photoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL("image/jpeg");
      setPhoto(imageDataUrl);
      if (onCapture) {
        onCapture(imageDataUrl);
      }
      return imageDataUrl;
    }
  };

  const downloadPhoto = () => {
    if (!photo) return;
    const link = document.createElement("a");
    link.download = "photo.jpg";
    link.href = photo;
    link.click();
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      {!photo ? (
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {!stream && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              Camera loading...
            </div>
          )}
        </div>
      ) : (
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <img
            src={photo}
            alt="Captured"
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <canvas ref={photoRef} className="hidden" />
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {!photo ? (
          <>
            <button
              onClick={toggleCamera}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Switch Camera
            </button>
            <button
              onClick={capturePhoto}
              disabled={!stream}
              className={`px-4 py-2 rounded transition ${
                stream
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Capture
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setPhoto(null)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Retake
            </button>
            <button
              onClick={downloadPhoto}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
            >
              Download
            </button>
          </>
        )}
        {/* <button
          onClick={stopCamera}
          disabled={!stream}
          className={`px-4 py-2 rounded transition ${
            stream
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Stop Camera
        </button> */}
      </div>
    </div>
  );
};

export default CameraComponent;
