import Image from "next/image";
import { FC, MouseEvent } from "react";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: "sm" | "md" | "lg";
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({
  src,
  alt = "User avatar",
  size = "md",
  onClick,
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        overflow-hidden 
        bg-gray-200
        ${onClick ? "cursor-pointer hover:opacity-90" : ""}
        ${className}
      `}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={100}
          height={100}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Avatar;
