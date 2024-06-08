import clsx from "clsx";
import React, { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  size?: "full" | "normal";
  variant?: "default" | "logout" | "theme";
};

const Button = ({
  children,
  size,
  variant = "default",
  ...buttonProps
}: ButtonProps) => {
  const btnClassName = clsx("flex justify-center relative", {
    "py-2.5 w-full": size === "full",
    "px-12 py-3": size === "normal",
    "bg-chat-blue-normal active:bg-chat-blue-active disabled:active:bg-chat-blue-normal rounded-xl text-xl text-white font-semibold":
      variant === "default",
    "py-5 px-6 hover:bg-chat-blue-active text-white": variant === "logout",
    "p-2 text-chat-blue-normal": variant === "theme",
  });

  return (
    <button {...buttonProps} className={btnClassName}>
      {children}
    </button>
  );
};

export default Button;
