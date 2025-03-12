import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
function Button({ children, onClick, className = "", ...rest }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-3 rounded-xl transition-all duration-300 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
