import React from 'react'

const Button = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <button className={`bg-[#3a5a40] text-white px-4 py-2 ${className}`}>
      {children}
    </button>
  );
};

export default Button;
