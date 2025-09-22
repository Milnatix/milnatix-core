'use client';

import React, { useEffect, useState } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  helpText?: string | null;
  className?: string;
}

// NOTE: função passada dentro de parênteses para forwardRef
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, placeholder, className = '', ...rest }, ref) => {
    const [filled, setFilled] = useState(false);
    const inputId = React.useId();

    useEffect(() => {
      // mais robusto: checar value e defaultValue
      const val = (rest.value ?? rest.defaultValue ?? '') as string;
      setFilled(Boolean(val && val.toString().length > 0));
    }, [rest.value, rest.defaultValue]);

    return (
      <div className={`relative w-full max-w-md ${className}`}>
        <input
          id={inputId}
          ref={ref} // <-- ESSENCIAL: encaminha a ref do forwardRef para o elemento DOM
          placeholder={placeholder || ' '}
          aria-invalid={!!error}
          maxLength={rest.maxLength ?? 255}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helpText
                ? `${inputId}-help`
                : undefined
          }
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
            ${error ? 'border-red-500 focus:border-red-600 focus:ring-red-600' : ''}
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
            ${error ? 'peer-focus:text-red-600 text-red-500' : ''}
            ${filled ? 'top-2 text-sm text-blue-600' : ''}
          `}
        >
          {label}
        </label>
        {(error || helpText) && (
          <p
            id={error ? `${inputId}-error` : `${inputId}-help`}
            className={`mt-1 text-xs ${error ? 'text-red-600' : 'text-gray-500'}`}
          >
            {error || helpText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
