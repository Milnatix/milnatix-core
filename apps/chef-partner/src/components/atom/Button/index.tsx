import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "default";
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  loading = false,
  children,
  disabled,
  className = "",
  ...rest
}) => {
  const baseClasses = `
    inline-flex
    items-center
    justify-center
    rounded-md
    px-4
    py-2
    text-base
    leading-6
    font-sans
    font-medium
    transition
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    disabled:opacity-50
    disabled:cursor-not-allowed
    cursor-pointer
    border
  `;

  const variants = {
    default: `
      bg-gray-100
      text-brand-700
      border-transparent
      hover:bg-gray-200
      focus-visible:ring-brand-500
      focus-visible:ring-offset-white
    `,
    primary: `
      bg-redappetite
      text-white
      border-transparent
      hover:bg-red-600
      focus-visible:ring-redappetite
      focus-visible:ring-offset-white
      shadow-sm
      hover:shadow-md
    `,
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  return (
    <button disabled={disabled || loading} className={classes} {...rest}>
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
