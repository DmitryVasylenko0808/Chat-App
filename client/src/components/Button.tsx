import React, { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

const Button = ({ children, ...buttonProps }: ButtonProps) => {
  return (
    <button
      {...buttonProps}
      className="flex justify-center relative py-2.5 w-full rounded-xl bg-chat-blue-normal 
      text-xl text-white font-semibold 
      active:bg-chat-blue-active disabled:active:bg-chat-blue-normal"
    >
      {children}
    </button>
  );
};

export default Button;
