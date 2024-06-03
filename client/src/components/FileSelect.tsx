import React, { ComponentProps, forwardRef } from "react";

type FileSelectProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

const FileSelect = forwardRef<HTMLInputElement, FileSelectProps>(
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
          type="file"
          className="mb-2 block w-full outline-none text-chat-gray-strength
          file:border-none file:p-2.5 file:rounded-xl file:bg-chat-blue-normal 
        file:text-white file:font-semibold file:cursor-pointer"
        />
        <p className="text-red-400 text-xs">{error}</p>
      </div>
    );
  }
);

export default FileSelect;
