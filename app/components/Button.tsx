import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  leftIcon?: ReactNode;
}

export const Button: React.FC<Props> = ({ children, leftIcon, ...props }) => {
  return (
    <button
      className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-lg shadow-black-500/40 transition duration-300 hover:bg-slate-200 hover:shadow-black"
      {...props}
    >
      {leftIcon} {children}
    </button>
  );
};
