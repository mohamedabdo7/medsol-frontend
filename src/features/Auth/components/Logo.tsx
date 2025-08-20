import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* Logo Icon - Replace with your Figma asset */}
      <div className="flex items-center justify-center">
        <img src="/icons/logo.svg" alt="MedSol Logo" />
      </div>
    </div>
  );
};

export default Logo;
