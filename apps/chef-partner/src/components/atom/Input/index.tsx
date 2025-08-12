import React, { useState, useEffect, useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  helpText?: string | null;
}

const Input: React.FC<InputProps> = ({ label, error, helpText, placeholder, id, className = "", ...rest }) => {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const inputId = id || useId();

  useEffect(() => {
    if (rest.value && rest.value.toString().length > 0) setFilled(true);
    else setFilled(false);
  }, [rest.value]);

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <input
        id={inputId}
        placeholder={placeholder || " "}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
        className={`
          block
          w-full
          rounded-md
          border
          border-gray-300
          bg-transparent
          px-3
          pt-6
          pb-2
          text-gray-900
          placeholder-transparent
          focus:border-blue-600
          focus:outline-none
          focus:ring-1
          focus:ring-blue-600
          disabled:cursor-not-allowed
          disabled:opacity-50
          transition
          peer
          ${error ? "border-red-500 focus:border-red-600 focus:ring-red-600" : ""}
        `}
        {...rest}
      />
      <label
        htmlFor={inputId}
        className={`
          absolute
          left-3
          top-2
          text-gray-500
          text-sm
          transition-all
          pointer-events-none
          origin-[0]
          peer-placeholder-shown:top-4
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-400
          peer-focus:top-2
          peer-focus:text-sm
          peer-focus:text-blue-600
          ${error ? "peer-focus:text-red-600 text-red-500" : ""}
          ${filled ? "top-2 text-sm text-blue-600" : ""}
        `}
      >
        {label}
      </label>
      {(error || helpText) && (
        <p
          id={error ? `${inputId}-error` : `${inputId}-help`}
          className={`mt-1 text-xs ${error ? "text-red-600" : "text-gray-500"}`}
        >
          {error || helpText}
        </p>
      )}
    </div>
  );
}

export default Input