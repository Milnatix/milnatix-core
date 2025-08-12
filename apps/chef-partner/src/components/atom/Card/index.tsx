import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        bg-white
        rounded-md            
        border                 
        border-gray-200        
        shadow-sm              
        p-6                    
        max-w-md
        w-full
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;
