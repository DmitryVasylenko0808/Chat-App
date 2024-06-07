import clsx from "clsx";
import React, { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & { size: "full" | "normal" };

const Button = ({ children, size, ...buttonProps }: ButtonProps) => {
  const btnClassName = clsx(
    "flex justify-center relative rounded-xl bg-chat-blue-normal text-xl text-white font-semibold  active:bg-chat-blue-active disabled:active:bg-chat-blue-normal",
    {
      "py-2.5 w-full": size === "full",
      "px-12 py-3": size === "normal",
    }
  );

  return (
    <button {...buttonProps} className={btnClassName}>
      {children}
    </button>
  );
};

export default Button;
