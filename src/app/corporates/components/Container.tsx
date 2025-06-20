import React from 'react'

interface ContainerProps {
    className?: string;
    children: React.ReactNode;
}

const Container = ({ className, children }: ContainerProps) => {
    return (
      <section
        className={`container sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl mx-auto lg:py-16 md:py-12 py-8 sm:px-0 px-6 ${className}`}
      >
        {children}
      </section>
    );
  };
  
  export default Container;