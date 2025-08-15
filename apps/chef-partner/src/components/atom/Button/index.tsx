import React from "react";

export type ButtonVariants =  "primary" | "secondary" | "danger" | "default";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
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

  const variants: Record<string, string> = {
    default: `
      bg-gray-100
      text-gray-800
      border-transparent
      hover:bg-gray-200
      focus-visible:ring-gray-500
      focus-visible:ring-offset-white
    `,
    primary: `
      bg-green-fresh
      text-white
      border-transparent
      hover:bg-green-fresh/90
      focus-visible:ring-green-fresh
      focus-visible:ring-offset-white
      shadow-sm
      hover:shadow-md
    `,
    secondary: `
      bg-[var(--color-blue-action)]
      text-white
      border-transparent
      hover:bg-[var(--color-blue-action)/90]
      focus-visible:ring-[var(--color-blue-action)]
      focus-visible:ring-offset-white
      shadow-sm
      hover:shadow-md
    `,
    danger: `
      bg-redappetite
      text-white
      border-transparent
      hover:bg-redappetite/90
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
