import React, { ComponentProps, forwardRef } from "react";

type TextFieldProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, ...inputProps }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2.5 block text-chat-gray-strength">
            {label}
          </label>
        )}
        <input
          {...inputProps}
          ref={ref}
          className="mb-2 p-2 border-2 rounded-xl block w-full outline-none text-xl text-chat-gray-strength font-semibold focus:border-chat-blue-normal"
        />
        <p className="text-red-400 text-xs">{error}</p>
      </div>
    );
  }
);

export default TextField;
