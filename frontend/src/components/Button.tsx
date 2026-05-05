import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const variantClasses = {
  primary:
    "bg-[#7164c0] text-white hover:bg-[#5a4fb0] ",
  secondary:
    "bg-[#e6e9ed] text-[#7164c0] hover:bg-[#d9dde1]" ,
};

const defaultStyles = "px-4 py-2 rounded-md transition-colors duration-300 font-light flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed";
export function Button({ variant, text, startIcon, onClick, type = "button", className = "" }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={variantClasses[variant] + " " + defaultStyles + " " + className}>
        <div className="pr-2">
      {startIcon}
            </div>

      {text}
    </button>
  );
}