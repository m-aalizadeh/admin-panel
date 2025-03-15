import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}
function Button({
  children,
  disabled,
  onClick,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-3 py-3 rounded-xl transition-all duration-300 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
