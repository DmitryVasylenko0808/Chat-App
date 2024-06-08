import React, { ComponentProps, forwardRef } from "react";
import { useTheme } from "../hooks/useTheme";
import clsx from "clsx";

type TextFieldProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, ...inputProps }, ref) => {
    const { theme } = useTheme();

    const inputClassName = clsx(
      "mb-2 p-2 border-2 rounded-xl block w-full outline-none bg-inherit text-xl font-semibold focus:border-chat-blue-normal",
      {
        "text-chat-gray-strength": theme === "light",
        "text-white border-chat-dark-border": theme === "dark",
      }
    );

    return (
      <div className="w-full">
        {label && (
          <label className="mb-2.5 block text-chat-gray-strength">
            {label}
          </label>
        )}
        <input {...inputProps} ref={ref} className={inputClassName} />
        <p className="text-red-400 text-xs">{error}</p>
      </div>
    );
  }
);

export default TextField;
